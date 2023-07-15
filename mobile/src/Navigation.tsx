import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Note } from "@common/types";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NoteEditor } from "screens/NoteEditor";
import { NoteList } from "screens/NoteList";

import { makeStyles } from "./theme/makeStyles";

const Stack = createStackNavigator();

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
}));

export type RootStackParamList = {
  noteList: undefined;
  noteEditor: { note: Note };
};

export const Navigation = () => {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" animated />
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="noteList" component={NoteList} />
            <Stack.Screen name="noteEditor" component={NoteEditor} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};
