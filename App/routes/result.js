import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

export default function Result({ route, navigation }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
      <View>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Retake"
        ></Button>
      </View>
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
