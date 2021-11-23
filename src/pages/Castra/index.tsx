import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { Button, Header, Loading } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput, Alert } from "react-native";
import { CastraPropsAnimal } from "../../interfaces/Castra.interface";
import colors from "../../styles/colors";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { AnimalProps } from "../../interfaces/Animal.interface";
import { apiAnimal } from "../../services/data";
import { AxiosError } from "axios";
import { IResponse } from "../../interfaces/Response.interface";

export default function Castra({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as AnimalProps;
  // console.log({ ...data });
  const [dataCastra, setDataCastra] = useState(data.castracao);
  const [isLoading, setIsLoading] = useState(true);
  function dataChange(item: string) {
    setDataCastra(item);
  }
  // const navigation = useNavigation();
  // function handleAnimal() {
  //   navigation.navigate("Animal", { ...data });
  // }
  async function onSubmit() {
    try {
      setIsLoading(true);
      if (dataCastra) {
        const dataEnvia = dataCastra.split("/");
        await apiAnimal.update(
          data.id,
          `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`
        );
        navigation.navigate("Animal", { ...data });
      } else {
        Alert.alert("Preencha todos os campos!!!");
        setIsLoading(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as IResponse;
      let message = "";
      if (data.data) {
        for (const [key, value] of Object.entries(data.data)) {
          message = `${message} ${value}`;
        }
      }
      Alert.alert(`${data.message} ${message}`);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <Header name={data.nome} image={data.imagem} />
          <Text style={styles.text}>Castração</Text>
          <TextInput
            style={styles.input}
            placeholder="dia/mês/ano"
            value={dataCastra}
            onChangeText={(text) => dataChange(text)}
          />
          <Button size="define" title="Salvar" onPress={onSubmit} />
        </SafeAreaView>
      )}
    </>
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
