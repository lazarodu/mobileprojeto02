import React from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native";
import { Header, Castracao, Vacinacao, ButtonText } from "../../components";
import { AnimalProps } from "../../interfaces/Animal.interface";
import { VacinaParamProps } from "../../interfaces/Vacina.interface";
import { AnimalTypes } from "../../types/ScreenStack.types";

export default function Animal({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as AnimalProps;
  // const navigation = useNavigation();
  function handleCastraAnimal() {
    navigation.navigate("Castra", { ...data });
  }
  function handleVacinaAnimal() {
    navigation.navigate("Vacina", { ...data });
  }
  function castraEdit() {
    navigation.navigate("Castra", { ...data });
  }
  function vacinaEdit(item: VacinaParamProps) {
    navigation.navigate("Vacina", { ...data, ...item });
  }
  function castraRemove() {
    console.log("Castra", { ...data });
  }
  function vacinaRemove(item: VacinaParamProps) {
    console.log("Vacina", { ...data, ...item });
  }
  function voltar() {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView>
      <Header name={data.title} image={data.image} />
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
      <ButtonText title="Voltar" onPress={voltar} />
    </SafeAreaView>
  );
}
