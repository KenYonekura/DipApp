import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// react navigation ライブラリ
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// react native paper ライブラリ
import { Provider as PaperProvider } from "react-native-paper"; // 追加

// Screens
import { Main } from "./src/Main";
import { Compose } from "./src/Compose";

export default function App() {

  // 任意点
  const arbitraryPoint = ();
  // 張力
  const tension = ();
  // 電線重量
  const lineWehight = ();
  // 重力
  const g = '9.806554';
  // 径間長
  const Spare = ();

  // 任意点弛度の計算
  const Result = lineWehight*g*(Spare-arbitraryPoint)*arbitraryPoint / 2*tension;

  const DispResult = 


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
