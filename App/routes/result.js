import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  processColor,
  ScrollView,
  Image,
} from "react-native";
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryTheme,
  VictoryBar,
} from "victory-native";

export default function Result({ route, navigation }) {
  const { data, photo } = route.params;
  const sampleData1 = [
    { x: "plumbness", y: data.plumbness },
    { x: "fibrousness", y: data.fibrousness },
    { x: "crispness", y: data.crispness },
    { x: "sweetness", y: data.sweetness },
    { x: "sourness", y: data.sourness },
  ];

  const sampleData2 = [
    { x: "moisture", y: 50 },
    { x: "sugar", y: 20 },
    { x: "vitamins", y: 15 },
    { x: "acidity", y: 30 },
    { x: "cellulose", y: 70 },
    { x: "soluble solids", y: 30 },
  ];

  let width = 0;
  let height = 0;
  const transform = [];

  if (photo.height > photo.width) {
    height = 300;
    width = (300 / photo.height) * photo.width;
    transform.push({ rotateZ: "-90deg" });
  } else {
    width = 300;
    height = (300 / photo.height) * photo.width;
  }
  fruit = data.tag;
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
          transform: transform,
        }}
      >
        <Image
          style={{ width: width, height: height }}
          source={{
            uri: photo.uri,
          }}
        />
      </View>
      <View>
        <Text>{fruit}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.chart}>
          <VictoryChart polar theme={VictoryTheme.material} width={300}>
            <VictoryArea
              data={sampleData1}
              style={{ data: { fill: "#c43a31" } }}
            />
            <VictoryPolarAxis />
          </VictoryChart>
        </View>
        <View style={styles.chart}>
          <VictoryChart polar theme={VictoryTheme.material} width={300}>
            <VictoryArea
              data={sampleData2}
              style={{ data: { fill: "#74b0dd" } }}
            />
            <VictoryPolarAxis />
          </VictoryChart>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: "#14274e",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
    display: "flex",
  },
  chart: {},
  row: {
    display: "flex",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  image: {
    display: "flex",
    alignItems: "center",
    marginTop: 100,
    transform: [{ rotateZ: "-90deg" }],
  },
});
