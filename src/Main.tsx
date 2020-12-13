// Navigationを使用するとい宣言
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper"; // 追加
import { TextInput, Text, Button } from "react-native-paper"; // 追加

export function Main() {
  // 画面遷移の定義
  const navigation = useNavigation();

  // Calc画面に移動する関数を定義
  const toCalc = () => {
    navigation.navigate("Calc");
  };

  const toTableView = () => {
    navigation.navigate("TableView");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.Title}>DIP</Text>
        <Button
          style={styles.Button}
          icon="calculator"
          mode="contained"
          onPress={toCalc}
        >
          START
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7C743",
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    margin: 10,
    fontSize: 30,
  },
  Button: {
    marginTop: 20,
  },
});
