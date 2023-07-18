import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { Note } from "@common/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { HSpace } from "components/atoms/HSpace";
import { Icon } from "components/atoms/Icon";
import { Screen } from "components/atoms/Screen";
import { Typography } from "components/atoms/Typography";
import { VSpace } from "components/atoms/VSpace";
import { Hero } from "components/molecules/Hero";
import { LoadingIndicator } from "components/molecules/LoadingIndicator";
import { format } from "date-fns";
import { useFetchNotes, useSaveNote } from "features/note/hooks";
import { Logger } from "library/logger";
import { RootStackParamList } from "Navigation";
import { useToggleTheme } from "theme/hooks";
import { makeStyles } from "theme/makeStyles";

type NoteListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "noteEditor"
>;

type Props = {
  navigation: NoteListScreenNavigationProp;
};

export const NoteList = ({ navigation }: Props) => {
  const { notes, refetch, isLoading, error: fetchNotesError } = useFetchNotes();
  const {
    saveNote,
    isLoading: isLoadingSave,
    error: saveNotesError,
  } = useSaveNote();

  const [showMenu, setShowMenu] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    if (fetchNotesError) {
      Logger.error("Error fetching notes!", fetchNotesError);
    }
  }, [fetchNotesError]);

  useEffect(() => {
    if (saveNotesError) {
      Logger.error("Error adding new note!", saveNotesError);
    }
  }, [saveNotesError]);

  const onAddNewNote = useCallback(async () => {
    try {
      const newNote = await saveNote({ author: "Ville Valmentaja" }); // Author is always same since changing user not implemented.
      if (newNote) {
        navigation.navigate("noteEditor", { noteId: newNote.id });
        refetch(); // refetch all notes for list since new one just added
      }
    } catch (err) {
      Logger.error("error adding new note", err);
    }
  }, [navigation, refetch, saveNote]);

  const toggleTheme = useToggleTheme();

  const onToggleTheme = useCallback(() => {
    toggleTheme();
    setShowMenu(false);
  }, [toggleTheme]);

  const toggleMenuVisibility = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const renderNote = useCallback(
    ({ item: note }: { item: Note }) => {
      return (
        <TouchableOpacity
          key={note.id}
          onPress={() => navigation.navigate("noteEditor", { noteId: note.id })}
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
          <Icon style={styles.noteArrowIcon} name="arrow-right" />
        </TouchableOpacity>
      );
    },

    [navigation, styles.noteArrowIcon, styles.noteContainer, styles.subtitle]
  );

  return (
    <Screen>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
      />

      <View style={styles.headerContainer}>
        <View style={styles.headerContentContainer}>
          <TouchableOpacity onPress={toggleMenuVisibility}>
            <Icon name="menu" size={30} />
          </TouchableOpacity>
          <VSpace size={2} />
          <Typography type="header">Notes</Typography>
          <VSpace size={2} />
          {(isLoading || isLoadingSave) && <LoadingIndicator />}
        </View>
        <Hero onPress={onAddNewNote} text="Add" style={styles.headerHero} />
      </View>
      <HSpace size={2} />
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={onToggleTheme}>
            <Typography type="body">Toggle theme</Typography>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
};

const useStyles = makeStyles(theme => {
  return {
    headerContainer: {
      flexDirection: "row",
    },
    headerContentContainer: {
      backgroundColor: theme.colors.grey25,
      minHeight: theme.spacing(8),
      borderRadius: theme.shape.round,
      marginHorizontal: theme.spacing(2),
      paddingHorizontal: theme.spacing(2),
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
    },
    headerHero: {
      marginRight: theme.spacing(2),
    },
    noteContainer: {
      minHeight: theme.spacing(10),
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
