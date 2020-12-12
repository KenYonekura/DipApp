import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// FireBseに接続するコンポーネント
import * as firebase from "firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";

// FireBaseのから取り出してくる電線諸元の型を定義･･･①
type Data = {
  maxT: number;
  weight: number;
};

export function Calc() {
  // 画面遷移の定義
  const navigation = useNavigation();
  // navigationによる画面遷移(戻り)
  const toMain = () => {
    navigation.navigate("Main");
  };

  // FireBaseから取得した電線諸元のデータを格納するフック･･･②
  // lineDataにはFireBaseから取得したSBACSR160のフィールドの値全てが格納される
  const [lineData, setlineDatas] = useState<Data[]>([]);
  console.log(lineData);

  useEffect(() => {
    getFirebaseItems();
  }, []);
  // FireBaseからデータを取得するお作法｡配列で確認する方法
  // const getFirebaseItems = async () => {
  //   const lineDataView = await firebase
  //     .firestore()
  //     .collection("Powerline")
  //     .get();
  //   const PowerlineData = lineDataView.docs.map((doc) => doc.data() as Data);
  //   setlineDatas(PowerlineData);
  // };
  const getFirebaseItems = async () => {
    const lineDataView = await firebase
      .firestore()
      .collection("Powerline")
      .get();
    const PowerlineData = lineDataView.docs.map((doc) => doc.data() as Data);
    setlineDatas(PowerlineData);
    // console.log(PowerlineData);
    // console.log(lineDataView);
  };

  // 任意点
  const [ArbitraryPoint, setArbitraryPoint] = React.useState("");
  // 張力
  const [Tension, setTension] = React.useState("");
  // 電線重量の表示･･･③
  // const lineWeight = lineData{SBACSRUGS160.weght};
  // console.log(lineData);
  const lineWeight = lineData.map((SBACSRUGS160, index) => (
    <View style={{ margin: 10 }} key={index.toString()}>
      <Text>{SBACSRUGS160.weight}</Text>
    </View>
  ));
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
      (lineWeight * g * (Spare - ArbitraryPoint) * ArbitraryPoint) /
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
      <Text>電線重量</Text>
      <Text>{lineWeight}</Text>
      <Text>任意点：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setArbitraryPoint(text)}
        value={ArbitraryPoint}
        keyboardType="numeric"
      />
      <Text>水平張力：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTension(text)}
        value={Tension}
        keyboardType="numeric"
      />
      <Text>径間長：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setSqare(text)}
        value={Spare}
        keyboardType="numeric"
      />
      <Text>樹高：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTreeHeight(text)}
        value={TreeHeight}
        keyboardType="numeric"
      />
      <Text>鉄塔高：</Text>
      <TextInput
        style={{ height: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTowerHeight(text)}
        value={TowerHeight}
        keyboardType="numeric"
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
