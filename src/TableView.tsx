import { StatusBar } from "expo-status-bar";
import { NavigationContext, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { loadAll } from "./Store";

export function TableView() {
  // 出力データの定義"Data"はData.tsで定義した型
  // const [datas, setDatas] = useState<Data[]>([]);

  const datas = [
    { str: "これだ", key: "これだ" },
    { str: "bbb", key: "bbbb" },
    { str: "ccc", key: "cccc" },
    { str: "ddd", key: "dddd" },
  ];

  // useEffect(() => {
  //   const initialize = async () => {
  //     const newData = await loadAll();
  //     setDatas(newData);
  //   };
  //   navigation.addListener("focus",initialize);
  // })

  // 画面遷移の定義
  const navigation = useNavigation();
  // Calc画面に移動する関数を定義
  const toCalc = () => {
    navigation.navigate("Calc");
  };

  return (
    <View styles={styles.container}>
      <FlatList
        data={datas}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button onPress={toCalc} title="計算に戻る" />
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
