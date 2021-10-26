import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, View } from "react-native";

import { Header, ButtonAnimal } from "../../components";
import data from "../../services/data";
import { AnimalProps } from "../../interfaces/Animal.interface";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { useAuth } from "../../hook/auth";

export default function Home({ navigation }: AnimalTypes) {
  const { user } = useAuth();
  function handleAnimal(item: AnimalProps) {
    navigation.navigate("Animal", { ...item });
  }
  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <Header
          hello="Olá"
          name={user?.name}
          image={{ uri: user.profile_photo_url }}
        />
      )}
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
