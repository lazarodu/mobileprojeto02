import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../pages";

const Stack = createStackNavigator();

export default function AnimalRoute() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
