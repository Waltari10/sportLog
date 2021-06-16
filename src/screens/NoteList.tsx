import * as React from "react";
import { View } from "react-native";
import makeStyles from "../theme/makeStyles";
import { Theme } from "../theme";
import Icon from "../components/Icon";
import Typography from "../components/Typography";
import Space from "../components/VSpace";
import { TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import { Hero } from "../components";
import { format } from "date-fns";

import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetNotes, useSaveNote } from "../features/note/hooks";
import LoadingIndicator from "../components/LoadingIndicator";
import useThemeState from "../theme/useThemeState";
import { FlatList } from "react-native";

const useStyles = makeStyles((theme: Theme) => {
  return {
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
      marginRight: theme.spacing(2),
    },
    noteContainer: {
      height: theme.spacing(10),
      marginLeft: theme.spacing(2),
      justifyContent: "center",
    },
    noteDragIndicator: {
      position: "absolute",
    },
    noteArrowIcon: {
      position: "absolute",
      right: theme.spacing(1),
    },
    subtitle: {
      flexDirection: "row",
      color: theme.colors.grey65,
    },
    menu: {
      borderRadius: theme.shape.round,
      position: "absolute",
      width: theme.spacing(20),
      padding: theme.spacing(1),
      backgroundColor: theme.colors.grey65,
      bottom: theme.spacing(5),
      left: theme.spacing(7),
    },
  };
});

type NoteListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "noteEditor"
>;

interface Props {
  navigation: NoteListScreenNavigationProp;
}

const NoteEditor: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  // TODO: Implement error handling
  const { notes, reload, isLoading } = useGetNotes();
  const { saveNote, isLoading: isLoadingSave } = useSaveNote();
  const [showMenu, setShowMenu] = React.useState(false);

  const theme = useThemeState();

  const styles = useStyles();
  return (
    <Screen>
      <FlatList
        data={notes}
        renderItem={({ item: note }: { item: Note }) => {
          return (
            <TouchableOpacity
              key={note.id}
              onPress={() => navigation.navigate("noteEditor", { note })}
              style={styles.noteContainer}
            >
              <View>
                <Typography type="body">{note.title}</Typography>
                <View style={styles.subtitle}>
                  <Typography type="subtitle">
                    {note.author}
                    {", "}
                  </Typography>
                  <Typography type="subtitle">
                    {!!note.createdAt &&
                      format(new Date(note.createdAt), "d.L.yyyy")}
                  </Typography>
                </View>
              </View>
              <Icon style={styles.noteArrowIcon} name="arrow-right"></Icon>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.headerContainer}>
        <View style={styles.headerContentContainer}>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
          <Space size={2} />
          <Typography type="header">All notes</Typography>
          <Space size={2} />
          {(isLoading || isLoadingSave) && <LoadingIndicator />}
        </View>
        <Hero
          onPress={() => {
            saveNote({ author: "Ville Valmentaja" })
              .then((note) => {
                if (note) {
                  navigation.navigate("noteEditor", { note });
                  reload();
                } else {
                  console.error("error adding new note!");
                }
              })
              .catch((err) => console.error("err adding new note", err));
          }}
          text="Add"
          style={styles.headerHero}
        />
      </View>
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              theme.toggleActiveTheme();
              setShowMenu(false);
            }}
          >
            <Typography type="body">Toggle theme</Typography>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
};

export default NoteEditor;
