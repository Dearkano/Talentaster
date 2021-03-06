import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./routes/home";
import ResultScreen from "./routes/result";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Result"
          options={{ headerShown: false }}
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
