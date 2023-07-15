import * as React from "react";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import diff from "fast-diff";
import { RootStackParamList } from "Navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import richText from "rich-text";
import { Error } from "sharedb";
import Sharedb from "sharedb/lib/client";
import { Socket } from "sharedb/lib/sharedb";

import { HSpace } from "../components/atoms/HSpace";
import { Icon } from "../components/atoms/Icon";
import { Screen } from "../components/atoms/Screen";
import { VSpace } from "../components/atoms/VSpace";
import { LoadingIndicator } from "../components/molecules/LoadingIndicator";
import { useGetNote, useSaveNote } from "../features/note/hooks";
import { applyOperations, parseDelta } from "../features/note/utils";
import { useDebounce } from "../library/hooks";
import { Logger } from "../library/logger";
import { useTheme } from "../theme/hooks";
import { makeStyles } from "../theme/makeStyles";
import { Theme } from "../theme/theme";

const UID = "user";

const useStyles = makeStyles((theme: Theme) => {
  return {
    input: {
      width: "100%",
      ...theme.fonts.body,
      color: theme.colors.white,
    },
    screen: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    navBar: {
      flexDirection: "row",
    },
  };
});

type NoteEditorScreenRouteProp = RouteProp<RootStackParamList, "noteEditor">;

type NoteEditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "noteEditor"
>;

type Props = {
  navigation: NoteEditorScreenNavigationProp;
};

type TextValue = {
  source: string | null;
  value: string | null;
};

let doc: Sharedb.Connection;

export const NoteEditor = ({ navigation }: Props) => {
  const route = useRoute<NoteEditorScreenRouteProp>();

  const noteId = route.params.note.id;

  const stateNote = useGetNote(noteId);

  const [title, setTitle] = React.useState(stateNote?.title || "");

  const { saveNote, isLoading } = useSaveNote();

  const debouncedSaveNote = useDebounce(saveNote, 1000);

  const onAnyChange = () => {
    const noteToSave = {
      ...stateNote,
      title,
      // content,
    };
    debouncedSaveNote(noteToSave);
  };

  const styles = useStyles();
  const theme = useTheme();

  const [text, setText] = React.useState<TextValue>({
    source: null,
    value: null,
  });

  const curTextRef = React.useRef<TextValue>({ value: "", source: "" });
  curTextRef.current = text;
  const prevTextRef = React.useRef<TextValue>({ value: "", source: "" });
  const prevText = prevTextRef.current;

  useEffect(() => {
    prevTextRef.current = text;

    if (
      text.value !== prevText?.value &&
      typeof text.value === "string" &&
      typeof prevText?.value === "string" &&
      text.source === UID
    ) {
      const delta = parseDelta(diff(prevText?.value || "", text.value));

      doc &&
        doc.submitOp(
          { ...delta, docId: noteId },
          { source: UID },
          (err: Error) => {
            if (err) {
              Logger.error(err);
            }
          }
        );
    }
  }, [noteId, prevText?.value, text]);

  useEffect(() => {
    // Create new connection just for editing...
    const ws = new WebSocket("ws://localhost:8080");

    const connection = new Sharedb.Connection(ws as Socket);

    doc = connection.get("documents", noteId);

    Sharedb.types.register(richText.type);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "OPEN_CONNECTION_TO_DOC",
          payload: {
            docId: noteId,
          },
        })
      );

      doc.subscribe((err: unknown) => {
        if (err) {
          throw err;
        }

        if (doc?.data?.ops?.length > 0) {
          setText({ value: doc.data.ops[0].insert || "", source: UID }); // Always only has insert delta at first...
        }

        doc.on("op", (delta: unknown, source) => {
          if (source === UID || !delta || !delta.ops || !delta.ops.length) {
            return;
          }

          const newString = applyOperations(delta, curTextRef?.current?.value);

          setText({ value: newString, source: "" });
        });
      });
    };
    return () => {
      connection.close();
      ws.close();
    };
  }, [noteId]);

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
          onAnyChange();
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
        value={text?.value || ""}
        onChangeText={newText => {
          setText({ value: newText, source: UID });
          onAnyChange();
        }}
        placeholderTextColor={theme.colors.grey65}
        editable
        multiline
        numberOfLines={5}
      />
    </Screen>
  );
};
