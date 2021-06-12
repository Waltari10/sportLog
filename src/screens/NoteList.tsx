import * as React from "react";
import { Text } from "react-native";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import makeStyles from "../theme/makeStyles";
import { Theme } from "../theme/theme";
import Icon from "../components/Icon";
import Typography from "../components/Typography";
import Space from "../components/VSpace";
import { TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import { Hero } from "../components";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      flexDirection: "row",
    },
    headerContentContainer: {
      backgroundColor: theme.colors.grey25,
      height: theme.spacing(8),
      borderRadius: theme.shape.round,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      flex: 1,
    },
    headerHero: {
      borderRadius: 100,
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: theme.spacing(2),
      backgroundColor: theme.colors.grey25,
      justifyContent: "center",
    },
  };
});

interface Props {
  navigation: unknown;
}

const NoteEditor: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const styles = useStyles();
  return (
    <Screen style={styles.root}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContentContainer}>
          <TouchableOpacity>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
          <Space size={2} />
          <Typography type="header">All notes</Typography>
        </View>
        <Hero
          onPress={() => navigation.navigate("note-editor")}
          text="Add"
          style={styles.headerHero}
        />
      </View>
    </Screen>
  );
};

export default NoteEditor;
