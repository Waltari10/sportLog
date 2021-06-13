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
import { useSaveNote } from "../features/note/hooks";
import { useDebounce } from "../hooks";
import LoadingIndicator from "../components/LoadingIndicator";
import Typography from "../components/Typography";

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

const NoteEditor: React.FunctionComponent<Props> = ({
  navigation,
  route,
}: Props) => {
  const defaultNote = route?.params?.note;
  const [title, setTitle] = React.useState(defaultNote?.title || "");
  const [content, setContent] = React.useState(defaultNote?.content || "");
  // TODO: Implement error handling
  const { saveNote, isLoading, isSuccess } = useSaveNote();

  const debouncedSaveNote = useDebounce(saveNote, 1000);

  const onAnyChange = () => {
    // Creates new note in DB, if doesn't exist...
    // Saving automatically after 1 second of inactivity

    const noteToSave = {
      ...defaultNote,
      title,
      content,
    };

    if (!noteToSave.author) {
      // TODO: Lets pretend I'm logged in...
      noteToSave.author = "Valtteri Laine";
      // if no createdAt then created now
      noteToSave.createdAt = new Date();
    }

    debouncedSaveNote(noteToSave);
  };

  const styles = useStyles();
  const theme = useTheme();

  return (
    <Screen style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={30} name="arrow-back-ios" />
        </TouchableOpacity>
        <VSpace size={2} />
        {isLoading && <LoadingIndicator />}
        <VSpace size={2} />
        {!isLoading && isSuccess && <Typography type="body">Saved!</Typography>}
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
      {/* TODO: Turn into rich text input */}
      <HSpace size={2} />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={content}
        onChangeText={(text) => {
          setContent(text);
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
