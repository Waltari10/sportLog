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
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { generateNotes } from "../mocks/generateNotes";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

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
    noteTextContent: {
      marginLeft: theme.spacing(5),
    },
    noteArrowIcon: {
      position: "absolute",
      right: theme.spacing(2),
    },
    subtitle: {
      flexDirection: "row",
      color: theme.colors.grey65,
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

const notesRaw = generateNotes(20);

const NoteEditor: React.FunctionComponent<Props> = ({ navigation }: Props) => {
  const [notes, setNotes] = React.useState(notesRaw);

  const styles = useStyles();
  return (
    <Screen>
      <DraggableFlatList
        // debug
        data={notes}
        renderItem={({ item, drag, isActive }: RenderItemParams<Note>) => {
          const note: Note = item as Note;
          return (
            <TouchableOpacity
              key={note.id}
              onLongPress={drag}
              onPress={() => navigation.navigate("noteEditor", { note })}
              style={[{ opacity: isActive && 0.5 }, styles.noteContainer]}
            >
              <Icon
                style={styles.noteDragIndicator}
                name="drag-indicator"
              ></Icon>
              <View style={styles.noteTextContent}>
                <Typography type="body">{note.title}</Typography>
                <View style={styles.subtitle}>
                  <Typography type="subtitle">
                    {note.author}
                    {", "}
                  </Typography>
                  <Typography type="subtitle">
                    {format(note.createdAt, "d.L.yyyy")}
                  </Typography>
                </View>
              </View>
              <Icon style={styles.noteArrowIcon} name="arrow-right"></Icon>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => setNotes(data)}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerContentContainer}>
          <TouchableOpacity>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
          <Space size={2} />
          <Typography type="header">All notes</Typography>
        </View>
        <Hero
          onPress={() => navigation.navigate("noteEditor")}
          text="Add"
          style={styles.headerHero}
        />
      </View>
    </Screen>
  );
};

export default NoteEditor;
