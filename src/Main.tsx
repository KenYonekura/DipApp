// Navigationを使用するとい宣言
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function Main() {
  // 画面遷移の定義
  const navigation = useNavigation();

  // Calc画面に移動する関数を定義
  const toCompose = () => {
    navigation.navigate("Calc");
  };

  return (
    <View style={styles.container}>
      <Text>DIP</Text>
      <Button onPress={toCompose} title="START" />
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
