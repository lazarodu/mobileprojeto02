import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { Button, Header } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { CastraPropsAnimal } from "../../interfaces/Castra.interface";
import colors from "../../styles/colors";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { AnimalProps } from "../../interfaces/Animal.interface";

export default function Castra({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as AnimalProps;
  console.log({ ...data });
  const [dataCastra, setDataCastra] = useState(data.castracao);
  function dataChange(item: string) {
    setDataCastra(item);
  }
  // const navigation = useNavigation();
  function handleAnimal() {
    navigation.navigate("Animal", { ...data });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header name={data.title} image={data.image} />
      <Text style={styles.text}>Castração</Text>
      <TextInput
        style={styles.input}
        placeholder="dia/mês/ano"
        value={dataCastra}
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
