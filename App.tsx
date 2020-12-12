import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// react navigation ライブラリ
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import "./src/Fire";

// react native paper ライブラリ
// import { Provider as PaperProvider } from "react-native-paper"; // 追加

// Screens
import { Main } from "./src/Main";
import { Calc } from "./src/Calc";
import { TableView } from "./src/TableView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Calc" component={Calc} />
        <Stack.Screen name="TableView" component={TableView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
