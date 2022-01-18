import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Header, ButtonAnimal, Loading } from "../../components";
import {
  AnimalProps,
  IAnimal,
  IInterfaceAnimal,
} from "../../interfaces/Animal.interface";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { useAuth } from "../../hook/auth";
import apiAnimal from "../../services/data/Animal";
import { AxiosError } from "axios";
import colors from "../../styles/colors";

export default function Home({ navigation }: AnimalTypes) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IInterfaceAnimal[]>();
  function handleAnimal(item: AnimalProps) {
    navigation.navigate("Animal", { ...item });
  }

  function cadastraAnimal() {
    navigation.navigate("CadastraAnimal", {
      nome: user?.name,
      imagem: user?.profile_photo_url,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAnimal.index();
        setData(response.data.data);
      } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as IAnimal;
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
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          {user && (
            <Header
              hello="Olá"
              name={user?.name}
              image={user.profile_photo_url}
            />
          )}
          {data && (
            <>
              <Text style={styles.message}>
                Você possui {data.length} animais adotados
              </Text>
              <View>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <ButtonAnimal
                      key={item.id}
                      title={item.nome}
                      onPress={() => handleAnimal(item)}
                      image={{ uri: item.imagem }}
                    />
                  )}
                  numColumns={2}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={cadastraAnimal}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 110,
    marginTop: 10,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  button: {
    position: "absolute",
    bottom: 1,
    right: 10,
    backgroundColor: colors.brown,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 40,
  },
});
