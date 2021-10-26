import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, ButtonText } from "../../components";
import { useAuth } from "../../hook/auth";
import { IAuthenticate } from "../../interfaces/User.interface";
import colors from "../../styles/colors";
import { LoginTypes } from "../../types/ScreenStack.types";

export default function Login({ navigation }: LoginTypes) {
  const { signIn } = useAuth();
  const [data, setData] = useState<IAuthenticate>();

  function handleCadastrar() {
    navigation.navigate("Cadastrar");
  }
  // function handleHome() {
  //   navigation.navigate("HomeStack");
  // }
  function handleChange(item: IAuthenticate) {
    setData({ ...data, ...item });
  }
  async function handleSignIn() {
    try {
      if (data?.email && data.password) {
        await signIn(data);
      } else {
        Alert.alert("Preencha todos os campos!!!");
      }
    } catch (error) {
      Alert.alert(`Erro ao fazer o login: ${error}`);
    }
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Adopted</Text>
        <View style={styles.formRow}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="e-mail"
            keyboardType="email-address"
            onChangeText={(i) => handleChange({ email: i })}
          ></TextInput>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="senha"
            secureTextEntry={true}
            onChangeText={(i) => handleChange({ password: i })}
          ></TextInput>
        </View>
        <Button title="Login" onPress={handleSignIn} />
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
