import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Cadastrar } from "../pages";

const Stack = createStackNavigator();

export default function LoginRoute() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastrar" component={Cadastrar} />
    </Stack.Navigator>
  );
}
