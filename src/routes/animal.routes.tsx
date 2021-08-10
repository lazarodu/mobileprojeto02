import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Animal, Castra, Vacina } from "../pages";

const Stack = createStackNavigator();

export default function AnimalRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Animal" component={Animal} />
      <Stack.Screen name="Castra" component={Castra} />
      <Stack.Screen name="Vacina" component={Vacina} />
    </Stack.Navigator>
  );
}
