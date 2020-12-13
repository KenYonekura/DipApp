import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  // Button,
} from "react-native";
// FireBseに接続するコンポーネント
import * as firebase from "firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";
// react native paper ライブラリ
import { Provider as PaperProvider } from "react-native-paper"; // 追加
import { Button } from "react-native-paper"; // 追加
import { color, sqrt } from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// FireBaseのから取り出してくる電線諸元の型を定義･･･①
type Data = {
  label: string;
  value: number;
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
    const PowerlineData = lineDataView.docs.map((doc, index) => {
      return {
        label: doc.id,
        value: doc.data().weight,
        key: "weight",
        // weight: doc.data().weight,
      };
    });
    setlineDatas(PowerlineData);
    console.log(PowerlineData);
    // console.log(lineDataView);
  };

  // 任意点
  const [ArbitraryPoint, setArbitraryPoint] = React.useState("");
  // 張力
  const [Tension, setTension] = React.useState("");
  // 電線重量の表示･･･③
  const [lineWeight, setLineWeight] = useState(0);
  // console.log(lineData);
  // const lineWeight = lineData.map((SBACSRUGS160, index) => (
  //   <View style={{ margin: 10 }} key={index.toString()}>
  //     <Text>{SBACSRUGS160.weight}</Text>
  //   </View>
  // ));

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
    // console.log(lineWeight);
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

  const lineDataArray = [
    { label: "SBACSRUGS160", value: 0, key: "weight" },
    { label: "SBACSRUGS210", value: 1, key: "weight" },
  ];
  console.log(lineDataArray);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.Text}>電線選択</Text>
        {/* iOSとアンドロイド対応のPicker */}
        <RNPickerSelect
          onValueChange={(value: number) =>
            setLineWeight(lineData[value].value)
          }
          items={lineDataArray}
        />
        {/* <KeyboardAwareScrollView> */}
        <Text style={styles.Text}>電線重量{lineWeight}</Text>
        <Text style={styles.Text}>任意点</Text>
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
          }}
          onChangeText={(text) => setArbitraryPoint(text)}
          value={ArbitraryPoint}
          keyboardType="numeric"
          // onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.Text}>水平張力</Text>
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
          }}
          onChangeText={(text) => setTension(text)}
          value={Tension}
          keyboardType="numeric"
          // onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.Text}>径間長</Text>
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
          }}
          onChangeText={(text) => setSqare(text)}
          value={Spare}
          keyboardType="numeric"
          // onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.Text}>樹高</Text>
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
          }}
          onChangeText={(text) => setTreeHeight(text)}
          value={TreeHeight}
          keyboardType="numeric"
          // onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={styles.Text}>鉄塔高</Text>
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
          }}
          onChangeText={(text) => setTowerHeight(text)}
          value={TowerHeight}
          keyboardType="numeric"
          // onSubmitEditing={Keyboard.dismiss}
        />
        <Button
          style={styles.Button}
          icon="calculator"
          mode="contained"
          onPress={resultDipAdd}
        >
          弛度計算結果
        </Button>
        {/* <Button onPress={resultDipAdd} title="計算" /> */}
        <Text style={styles.Text}>{result}</Text>
        <StatusBar style="auto" />
        <Button
          style={styles.Button}
          icon="tree"
          mode="contained"
          onPress={resultSeparationAdd}
        >
          離隔計算結果
        </Button>
        {/* <Button onPress={resultSeparationAdd} title="計算" /> */}
        <Text style={styles.Text}>{result2}</Text>
        <StatusBar style="auto" />
        {/* </KeyboardAwareScrollView> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7C743",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  Text: {
    margin: 5,
    fontSize: 20,
  },
  Title: {
    margin: 10,
  },
  Button: {
    margin: 10,
  },
  textInput: {
    height: 10,
    borderColor: "#fff",
    borderWidth: 30,
  },
  picker: {
    alignItems: "center",
  },
});
