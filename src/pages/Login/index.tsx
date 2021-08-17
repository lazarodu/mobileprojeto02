import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
// import { useNavigation } from "@react-navigation/core";
// import { useNavigationContainerRef } from "@react-navigation/native";
import { Button, ButtonText } from "../../components";
import colors from "../../styles/colors";
import { LoginTypes } from "../../types/ScreenStack.types";

export default function Login({ navigation }: LoginTypes) {
  // const navigation = useNavigation();
  // const navigation = useNavigationContainerRef();
  function handleCadastrar() {
    navigation.navigate("Cadastrar");
  }
  function handleHome() {
    navigation.navigate("HomeStack");
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Adopted</Text>
        <View style={styles.formRow}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="e-mail"></TextInput>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="senha"></TextInput>
        </View>
        <Button title="Login" onPress={handleHome} />
        <ButtonText title="Cadastre-se" onPress={handleCadastrar} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: colors.black,
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
    color: colors.black,
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
