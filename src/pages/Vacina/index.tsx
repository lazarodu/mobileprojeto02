import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { Button, Header } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import {
  VacinaParamProps,
  VacinaPropsAnimal,
} from "../../interfaces/Vacina.interface";
import colors from "../../styles/colors";
import { AnimalTypes } from "../../types/ScreenStack.types";

export default function Vacina({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as VacinaParamProps;
  console.log({ ...data });
  const [nomeVacina, setNomeVacina] = useState(data.nome);
  const [dataVacina, setDataVacina] = useState(data.data);
  function nomeChange(item: string) {
    setNomeVacina(item);
  }
  function dataChange(item: string) {
    setDataVacina(item);
  }
  // const navigation = useNavigation();
  function handleAnimal() {
    navigation.navigate("Animal", { ...data });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header name={data.title} image={data.image} />
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
