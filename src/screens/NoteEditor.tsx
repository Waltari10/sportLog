/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import makeStyles from "../theme/makeStyles";
import { Theme } from "../theme";
import useTheme from "../theme/useTheme";
import Screen from "../components/Screen";
import { Icon, HSpace, VSpace } from "../components";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useGetNote, useSaveNote } from "../features/note/hooks";
import { useDebounce } from "../hooks";
import LoadingIndicator from "../components/LoadingIndicator";
import Sharedb from "sharedb/lib/client";
//@ts-ignore
import richText from "rich-text";
import { applyDelta, parseDelta } from "../features/note/utils";

import { useEffect } from "react";
import diff from "fast-diff";
import { Error } from "sharedb";
import { Socket } from "sharedb/lib/sharedb";

const uid = "user";

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

interface Props {
  navigation: NoteEditorScreenNavigationProp;
  route: NoteEditorScreenRouteProp;
}

type TextValue = {
  source: string | null;
  value: string | null;
};

let doc: Sharedb.Connection;

const NoteEditor: React.FunctionComponent<Props> = ({
  navigation,
  route,
}: Props) => {
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
      text.source === uid
    ) {
      const delta = parseDelta(diff(prevText?.value || "", text.value));
      doc &&
        doc.submitOp(
          { ...delta, docId: noteId },
          { source: uid },
          (err: Error) => {
            if (err) {
              console.error(err);
            }
          }
        );
    }
  }, [text]);

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

      doc.subscribe((err) => {
        if (err) throw err;

        if (doc?.data?.ops?.length > 0) {
          setText({ value: doc.data.ops[0].insert || "", source: uid }); // Always only has insert delta at first...
        }

        doc.on("op", (delta: any, source) => {
          if (source === uid || !delta || !delta.ops || !delta.ops.length) {
            return;
          }

          const newString = applyDelta(delta, curTextRef?.current?.value);

          setText({ value: newString, source: "" });
        });
      });
    };
    return () => {
      connection.close();
      ws.close();
    };
  }, []);

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
        onChangeText={(text) => {
          setTitle(text);
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
        onChangeText={(text) => {
          setText({ value: text, source: uid });
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

export default NoteEditor;
