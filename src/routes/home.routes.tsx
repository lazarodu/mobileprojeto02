import React from "react";
import { Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AnimalStack from "./animal.routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../styles/colors";

const Drawer = createDrawerNavigator();

export default function HomeRoute() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.brownLight },
        headerTintColor: colors.white,
        headerTitle: () => <Text style={styles.title}>Animais</Text>,
      }}
    >
      <Drawer.Screen
        name="AnimalStack"
        component={AnimalStack}
        options={{
          drawerLabel: "Animais",
          drawerIcon: () => (
            <MaterialCommunityIcons name="dog" size={24} color={colors.brown} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
