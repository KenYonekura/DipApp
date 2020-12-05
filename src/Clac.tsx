import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Calc() {
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
  // 樹高
  const treeHeight = ();

  const towerHeight = ();

  // 任意点弛度の計算
  const Result = lineWehight*g*(Spare-arbitraryPoint)*arbitraryPoint / 2*tension;

  // 離隔計算結果
  const DispResult = towerHeight - treeHeight - Result;

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
