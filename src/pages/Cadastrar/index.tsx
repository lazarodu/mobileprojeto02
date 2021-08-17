import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
// import { useNavigation } from "@react-navigation/core";
import { Button, ButtonText } from "../../components";
import { LoginTypes } from "../../types/ScreenStack.types";

export default function Cadastrar({ navigation }: LoginTypes) {
  // const navigation = useNavigation();
  function handleLogin() {
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Adopted</Text>
        <View style={styles.formRow}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} placeholder="nome"></TextInput>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="e-mail"></TextInput>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="senha"></TextInput>
        </View>
        <Button title="Salvar" onPress={handleLogin} />
        <ButtonText title="Voltar" onPress={handleLogin} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: "black",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  formRow: {
    margin: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    color: "black",
    padding: 5,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    padding: 5,
    width: "50%",
    marginLeft: 5,
    marginBottom: 5,
  },
});
