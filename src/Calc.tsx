import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";

export function Calc() {
  // 画面遷移の定義
  const navigation = useNavigation();
  // navigationによる画面遷移(戻り)
  const toMain = () => {
    navigation.navigate("Main");
  };

  // 任意点
  const [ArbitraryPoint, setArbitraryPoint] = React.useState("");
  // 張力
  const [Tension, setTension] = React.useState("");
  // 電線重量
  const lineWehight = 0.7663;
  // 重力
  const g = 9.80665;
  // 径間長
  const [Spare, setSqare] = React.useState("");
  // 樹高
  const [TreeHeight, setTreeHeight] = React.useState("");
  // 鉄塔
  const [TowerHeight, setTowerHeight] = React.useState("");
  // 弛度結果出力
  const [result, setResult] = React.useState(0);
  // 離隔結果出力
  const [result2, setResult2] = React.useState(0);

  // 任意点弛度の計算
  const resultDipAdd = () => {
    const result =
      (lineWehight * g * (Spare - ArbitraryPoint) * ArbitraryPoint) /
      (2 * Tension);
    setResult(result);
  };

  // 離隔の計算結果
  const resultSeparationAdd = () => {
    const result2 = TowerHeight - TreeHeight - result;
    setResult2(result2);
  };

  return (
    <View style={styles.container}>
      <Text>任意点：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setArbitraryPoint(text)}
        value={ArbitraryPoint}
      />
      <Text>水平張力：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTension(text)}
        value={Tension}
      />
      <Text>径間長：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setSqare(text)}
        value={Spare}
      />
      <Text>樹高：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTreeHeight(text)}
        value={TreeHeight}
      />
      <Text>鉄塔高：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTowerHeight(text)}
        value={TowerHeight}
      />
      <Text>任意点弛度</Text>
      <Button onPress={resultDipAdd} title="計算" />
      <Text>{result}</Text>
      <StatusBar style="auto" />
      <Text>離隔</Text>
      <Button onPress={resultSeparationAdd} title="計算" />
      <Text>{result2}</Text>
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
