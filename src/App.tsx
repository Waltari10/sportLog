import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import NoteEditor from "./screens/NoteEditor";
import NoteList from "./screens/NoteList";
import makeStyles from "./theme/makeStyles";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const useStyles = makeStyles((theme) => ({
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

export default function App(): JSX.Element {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" animated />
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="noteList" component={NoteList} />
            <Stack.Screen name="noteEditor" component={NoteEditor} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}
