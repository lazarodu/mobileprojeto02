import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import { Button, Header } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { VacinaPropsAnimal } from "../../interfaces/Vacina.interface";
import colors from "../../styles/colors";

export default function Vacina() {
  const route = useRoute();
  const { title, image, nome, data } = route.params as VacinaPropsAnimal;
  console.log({ title, image, nome, data });
  const [nomeVacina, setNomeVacina] = useState(nome);
  const [dataVacina, setDataVacina] = useState(data);
  function nomeChange(item: string) {
    setNomeVacina(item);
  }
  function dataChange(item: string) {
    setDataVacina(item);
  }
  const navigation = useNavigation();
  function handleAnimal() {
    navigation.navigate("Animal");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header name={title} image={image} />
      <Text style={styles.text}>Vacinação</Text>
      <TextInput
        style={styles.input}
        placeholder="nome"
        value={nomeVacina}
        onChangeText={(text) => nomeChange(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="dia/mês/ano"
        value={dataVacina}
        onChangeText={(text) => dataChange(text)}
      />
      <Button size="define" title="Salvar" onPress={handleAnimal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
    margin: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    fontSize: 16,
    padding: 10,
    width: "50%",
    marginTop: 20,
    marginBottom: 20,
  },
});
