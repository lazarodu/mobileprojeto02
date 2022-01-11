import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { Button, ButtonText, Header, Loading } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput, Alert } from "react-native";
import {
  VacinaParam,
  VacinaParamProps,
} from "../../interfaces/Vacina.interface";
import colors from "../../styles/colors";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { apiVacina } from "../../services/data";
import { AxiosError } from "axios";

export default function Vacina({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as VacinaParamProps;
  const [isLoading, setIsLoading] = useState(true);
  const [dataVacina, setDataVacina] = useState<VacinaParam | undefined>({
    ...data.vacinacao,
  });

  function dataChange(item: VacinaParam) {
    setDataVacina({ ...dataVacina, ...item });
  }
  // const navigation = useNavigation();
  // function handleAnimal() {
  //   navigation.navigate("Animal", { ...data });
  // }
  async function onSubmit() {
    try {
      setIsLoading(true);
      if (dataVacina?.data && dataVacina.nome) {
        const dataEnvia = dataVacina.data.split("/");

        if (data.vacinacao && data.vacinacao.id > 0) {
          await apiVacina.update(data.vacinacao.id, {
            nome: dataVacina.nome,
            data: `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`,
            animal_id: data.id,
          });
        } else {
          await apiVacina.store({
            nome: dataVacina.nome,
            data: `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`,
            animal_id: data.id,
          });
        }
        navigation.navigate("Animal", { id: data.id });
      } else {
        Alert.alert("Preencha todos os campos!!!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      console.log(err.response?.data);
    } finally {
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
          <Text style={styles.text}>Vacinação</Text>
          <TextInput
            style={styles.input}
            placeholder="nome"
            value={dataVacina && dataVacina.nome}
            onChangeText={(i) => dataChange({ nome: i })}
          />
          <TextInput
            style={styles.input}
            placeholder="dia/mês/ano"
            value={dataVacina && dataVacina.data}
            onChangeText={(i) => dataChange({ data: i })}
          />
          <Button size="define" title="Salvar" onPress={onSubmit} />
          <ButtonText
            onPress={() => navigation.navigate("Animal", { ...data })}
            title="Voltar"
          />
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
