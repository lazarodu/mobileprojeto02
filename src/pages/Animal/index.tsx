import React, { useCallback, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, Image, StyleSheet, Alert } from "react-native";
import {
  Header,
  Castracao,
  Vacinacao,
  ButtonText,
  Loading,
} from "../../components";
import {
  AnimalProps,
  IInterfaceAnimal,
} from "../../interfaces/Animal.interface";
import {
  IVacinaParam,
  VacinaParamProps,
} from "../../interfaces/Vacina.interface";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { AxiosError } from "axios";
import { IResponse } from "../../interfaces/Response.interface";
import { apiAnimal, apiVacina } from "../../services/data";
import api from "../../services/api";

export default function Animal({ navigation }: AnimalTypes) {
  const route = useRoute();
  const { id } = route.params as AnimalProps;
  const [data, setData] = useState<IInterfaceAnimal>();
  const [isLoading, setIsLoading] = useState(true);
  // const navigation = useNavigation();
  function handleCastraAnimal() {
    navigation.navigate("Castra", { ...data });
  }
  function handleVacinaAnimal() {
    navigation.navigate("Vacina", {
      id: data?.id,
      nome: data?.nome,
      imagem: data?.imagem,
    });
  }
  function castraEdit() {
    navigation.navigate("Castra", { ...data });
  }
  function vacinaEdit(item: IVacinaParam) {
    navigation.navigate("Vacina", {
      id: data?.id,
      nome: data?.nome,
      imagem: data?.imagem,
      vacinacao: { ...item },
    });
  }
  async function castraRemove() {
    console.log("Castra", { ...data });
    try {
      if (data) {
        await apiAnimal.deleteCastracao(data.id);
        await fetchData();
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
    }
  }
  const fetchData = useCallback(async () => {
    try {
      const response = await apiAnimal.show(id);
      const dataCastra = response.data.data.castracao
        ? response.data.data.castracao.split("-")
        : "";
      const animal = {
        id: response.data.data.id,
        nome: response.data.data.nome,
        imagem: response.data.data.imagem,
        castracao: dataCastra
          ? `${dataCastra[2]}/${dataCastra[1]}/${dataCastra[0]}`
          : undefined,
        vacinacao: response.data.data.vacinacao
          ? response.data.data.vacinacao.map((item) => {
              const dataVacina = item.data.split("-");
              return {
                id: item.id,
                nome: item.nome,
                data: `${dataVacina[2]}/${dataVacina[1]}/${dataVacina[0]}`,
              };
            })
          : undefined,
      };
      setData(animal);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function vacinaRemove(item: IVacinaParam) {
    try {
      setIsLoading(true);
      await apiVacina.destroy(item.id);
      await fetchData();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  }
  function voltar() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    navigation.addListener("focus", () => fetchData());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView>
          {data && (
            <>
              <Header name={data.nome} image={data.imagem} />
              <Castracao
                title="Castração"
                onPress={handleCastraAnimal}
                buttonEdit={castraEdit}
                buttonRemove={castraRemove}
                data={data.castracao}
              />
              <Vacinacao
                title="Vacinação"
                onPress={handleVacinaAnimal}
                buttonEdit={vacinaEdit}
                buttonRemove={vacinaRemove}
                vacinacao={data.vacinacao}
              />
              <ButtonText onPress={voltar} title="Voltar" />
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "10%",
    height: "10%",
  },
});
