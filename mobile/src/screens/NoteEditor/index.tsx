import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { UID } from "@common/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HSpace } from "components/atoms/HSpace";
import { Icon } from "components/atoms/Icon";
import { Screen } from "components/atoms/Screen";
import { VSpace } from "components/atoms/VSpace";
import { LoadingIndicator } from "components/molecules/LoadingIndicator";
import { useNote, useSaveNote } from "features/note/hooks";
import {
  applyOperations,
  Operations,
  parseOperations,
} from "features/note/utils";
import { useDebounce, usePreviousRenderValue } from "library/hooks";
import { Logger } from "library/logger";
import { RootStackParamList } from "Navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import richText from "rich-text";
import {
  useNoteFromShareDB,
  useShareDbConnection,
  useWebSocketConnection,
} from "screens/NoteEditor/hooks";
import { useListenToRemoteNoteChanges } from "screens/NoteEditor/useListenToRemoteNoteChanges";
import { Error } from "sharedb";
import Sharedb from "sharedb/lib/client";
import { useTheme } from "theme/hooks";
import { makeStyles } from "theme/makeStyles";
import { Theme } from "theme/theme";

Sharedb.types.register(richText.type);

type NoteEditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "noteEditor"
>;

type Props = {
  navigation: NoteEditorScreenNavigationProp;
};

type TextWithSource = {
  source: string;
  value: string;
};

export const NoteEditor = ({ navigation }: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, "noteEditor">>();

  const { noteId } = route.params;

  const note = useNote(noteId);

  /**
   * Note title does not have collaborative editing. (Since non-production tech demo app)
   */
  const [title, setTitle] = useState(note?.title || "");

  const { saveNote, isLoading } = useSaveNote();

  const debouncedSaveNote = useDebounce(saveNote, 1000);

  const onNoteChange = useCallback(() => {
    if (note?.id) {
      debouncedSaveNote({
        ...note,
        title,
      });
    }
  }, [debouncedSaveNote, note, title]);

  const styles = useStyles();
  const theme = useTheme();

  const [textWithSource, setTextWithSource] = useState<TextWithSource>({
    source: UID,
    value: note?.content || "",
  });

  /**
   * curTextRef is used to pass a reference to text to onRemoteOperation callback.
   * This is because useListenToRemoteNoteChanges register a listener on ShareDB which uses the value.
   * If using string value directly from state the function would have to change every time and
   * would have to re-register the listener on every key stroke. Maybe reasonable, but causes bug with
   * receiving remote changes on other phones so just going with this reference instead.
   */
  const curTextRef = useRef<TextWithSource>(textWithSource);
  curTextRef.current = textWithSource;

  const prevTextWithSource = usePreviousRenderValue(curTextRef.current);

  const ws = useWebSocketConnection();
  const connection = useShareDbConnection(ws);
  const shareDBNote = useNoteFromShareDB(connection, noteId);

  const onRemoteOperation = useCallback(
    (
      delta: {
        ops: Operations[];
      },
      source: string
    ) => {
      // If user made the changes locally make sure not to apply again.
      if (source === UID) return;

      // Modify local string in state with incoming operations from other users.
      const newString = applyOperations(delta.ops, curTextRef?.current?.value);

      setTextWithSource({ value: newString, source });
    },
    []
  );

  /**
   * Apply remote changes to local React Component state.
   */
  useListenToRemoteNoteChanges(ws, shareDBNote, noteId, onRemoteOperation);

  /**
   * Submit local changes to the server in real time for other collaborators.
   */
  useEffect(() => {
    if (
      // Check that text changed and that it was the local user who made the changes to sync.
      textWithSource.value !== prevTextWithSource?.value &&
      textWithSource.source === UID &&
      shareDBNote
    ) {
      // Calculate operations on text content to send to other users.
      const operations = parseOperations(
        prevTextWithSource.value,
        textWithSource.value
      );

      shareDBNote.submitOp(
        { ops: operations, docId: noteId },
        { source: UID },
        (err: Error) => {
          if (err) {
            Logger.error(err);
          }
        }
      );
    }
  }, [noteId, prevTextWithSource?.value, shareDBNote, textWithSource]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={30} name="arrow-back-ios" />
        </TouchableOpacity>
        <VSpace size={2} />
        {isLoading && <LoadingIndicator />}
        <VSpace size={2} />
      </View>
      <HSpace size={4} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={newText => {
          setTitle(newText);
          onNoteChange();
        }}
        placeholderTextColor={theme.colors.grey65}
        autoFocus
        editable
        multiline
      />
      <HSpace size={2} />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={textWithSource?.value || ""}
        onChangeText={newText => {
          setTextWithSource({ value: newText, source: UID });
          onNoteChange();
        }}
        placeholderTextColor={theme.colors.grey65}
        editable
        multiline
        numberOfLines={5}
      />
    </Screen>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    input: {
      width: "100%",
      ...theme.fonts.body,
      color: theme.colors.white,
    },
    screen: {
      padding: theme.spacing(2),
    },
    navBar: {
      flexDirection: "row",
    },
  };
});
