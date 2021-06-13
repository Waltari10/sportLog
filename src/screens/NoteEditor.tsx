import * as React from "react";
import makeStyles from "../theme/makeStyles";
import { Theme } from "../theme";
import useTheme from "../theme/useTheme";
import Screen from "../components/Screen";
import { Icon, HSpace } from "../components";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

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
  const [content, setContent] = React.useState(defaultNote?.note || "");

  const styles = useStyles();
  const theme = useTheme();

  return (
    <Screen style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={25} name="arrow-back-ios" />
      </TouchableOpacity>
      <HSpace size={4} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.colors.grey65}
        autoFocus
        editable
        multiline
      />
      {/* Turn into rich text input */}
      <HSpace size={2} />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={content}
        onChangeText={setContent}
        placeholderTextColor={theme.colors.grey65}
        editable
        multiline
        numberOfLines={5}
      />
    </Screen>
  );
};

export default NoteEditor;
