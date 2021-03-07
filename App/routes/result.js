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
import StarRating from "react-native-star-rating";

export default function Result({ route, navigation }) {
  const { data, photo } = route.params;
  const sampleData = [
    { x: "plumbness", y: data.plumpness },
    { x: "PH", y: data.acidity },
    { x: "moisture", y: data.moisture },
    { x: "hardness", y: data.crispness },
    { x: "soluble solid", y: data.soluble },
    { x: "cellulose", y: data.cellulose },
  ];

  let sweetness = 5;
  let sourness = 5;
  let ripeness = 5;
  if (data.soluble < 0.8) {
    sweetness = 3;
  }
  if (data.acidity < 0.8) {
    sourness = 3;
  }
  if (data.crispness < 0.8) {
    ripeness = 3;
  }

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
  if (data.tag === "") {
    navigation.navigate("Home");
  }
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
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 45,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#ff9933",
            marginBottom: 50,
          }}
        >
          {fruit}
        </Text>
      </View>
      <View
        style={{
          width: 300,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#5ccccb",
            alignSelf: "center",
          }}
        >
          Sweetness
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={sweetness}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          fullStarColor={"#5ccccb"}
        />
      </View>
      <View
        style={{
          width: 300,
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#dd9cac",
            alignSelf: "center",
          }}
        >
          Sourness
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={sourness}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          fullStarColor={"#dd9cac"}
        />
      </View>
      <View
        style={{
          width: 300,
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Arial",
            fontWeight: "bold",
            color: "#f29d7a",
            alignSelf: "center",
          }}
        >
          Ripeness
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={ripeness}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          fullStarColor={"#f29d7a"}
        />
      </View>
      <View style={styles.column}>
        <View style={styles.chart}>
          <VictoryChart polar theme={VictoryTheme.material} width={300}>
            <VictoryArea
              data={sampleData}
              style={{ data: { fill: "#c43a31" } }}
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
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});
