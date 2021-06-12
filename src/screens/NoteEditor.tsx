import * as React from "react";
import { Text } from "react-native";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import makeStyles from "../theme/makeStyles";
import { Theme, ThemeContext } from "../theme/ThemeProvider";
import useTheme from "../theme/useTheme";
import Typography from "../components/Typography";
import Screen from "../components/Screen";
import { Hero, Icon, HSpace } from "../components";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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

interface Props {
  navigation: unknown;
}

// TODO: Back button
// TODO: title, and content input fields

const NoteEditor: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");

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
        value={note}
        onChangeText={setNote}
        placeholderTextColor={theme.colors.grey65}
        editable
        multiline
        numberOfLines={5}
      />
    </Screen>
  );
};

export default NoteEditor;
