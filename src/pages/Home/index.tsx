import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Header, ButtonAnimal } from "../../components";
import data from "../../services/data";
import { AnimalProps } from "../../interfaces/Animal.interface";

export default function Home() {
  const navigation = useNavigation();
  function handleAnimal(item: AnimalProps) {
    navigation.navigate("Animal", { ...item });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        hello="Olá"
        name="Lázaro"
        image={require("../../../assets/img/lazaro.png")}
      />
      <Text style={styles.message}>Você possui 2 animais adotados</Text>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ButtonAnimal
              key={item.id}
              title={item.title}
              onPress={() => handleAnimal(item)}
              image={item.image}
            />
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 110,
    marginTop: 10,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
});
