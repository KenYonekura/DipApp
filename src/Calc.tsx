import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function Calc() {
  // 画面遷移の定義
  const navigation = useNavigation();

  const toCompose = () => {
    navigation.navigate("Main");
  };

  // 任意点
  const arbitraryPoint = 100;
  // 張力
  const tension = 20000;
  // 電線重量
  const lineWehight = 0.7663;
  // 重力
  const g = 9.80665;
  // 径間長
  const Spare = 400;
  // 樹高
  const treeHeight = 25;
  // 鉄塔
  const towerHeight = 35;

  // 任意点弛度の計算
  const Result =
    (lineWehight * g * (Spare - arbitraryPoint) * arbitraryPoint) /
    (2 * tension);

  // 離隔計算結果
  const DispResult = towerHeight - treeHeight - Result;

  return (
    <View style={styles.container}>
      <Text>calc</Text>
      <Button onPress={toCompose} title="計算" />
      <Text>{DispResult}</Text>
      <StatusBar style="auto" />
    </View>
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
