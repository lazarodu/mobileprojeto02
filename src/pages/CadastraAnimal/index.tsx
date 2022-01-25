import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Button, ButtonText, Header, Loading } from "../../components";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../styles/colors";
import { AnimalTypes } from "../../types/ScreenStack.types";
import { AxiosError } from "axios";
import {
  AnimalProps,
  ICadastraAnimalParam,
} from "../../interfaces/Animal.interface";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { apiAnimal } from "../../services/data";

export default function CadastraAnimal({ navigation }: AnimalTypes) {
  const route = useRoute();
  const data = route.params as AnimalProps;
  const [isLoading, setIsLoading] = useState(true);
  const [cadastra, setCadastra] = useState<ICadastraAnimalParam>();
  const [startOver, setStartOver] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera: Camera;

  function dataChange(item: ICadastraAnimalParam) {
    setCadastra({ ...cadastra, ...item });
  }
  const takePicture = async () => {
    if (!camera) return;
    const options = { quality: 0.5, base64: true };
    const photo = await camera.takePictureAsync(options);
    setCadastra({ ...cadastra, imagem: photo });
    setStartOver(true);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [3, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setCadastra({ ...cadastra, imagem: result });
    }
  };
  async function onSubmit() {
    try {
      setIsLoading(true);
      if (cadastra?.nome && cadastra.nascimento && cadastra.imagem) {
        const dataEnvia = cadastra.nascimento.split("/");
        const imageName = cadastra.imagem.uri?.split("/").pop();
        const formData = new FormData();
        formData.append("imagem", cadastra.imagem.base64);
        if (imageName) {
          formData.append("file", imageName);
        }
        formData.append("nome", cadastra.nome);
        formData.append(
          "nascimento",
          `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`
        );
        const response = await apiAnimal.store(formData);
        navigation.navigate("Home");
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
        <>
          {startOver ? (
            <SafeAreaView style={styles.container}>
              <Header name={data.nome} image={data.imagem} />
              <Text style={styles.text}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="nome"
                value={cadastra && cadastra.nome}
                onChangeText={(i) => dataChange({ nome: i })}
              />
              <Text style={styles.text}>Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="dia/mês/ano"
                value={cadastra && cadastra.nascimento}
                onChangeText={(i) => dataChange({ nascimento: i })}
              />
              <Text style={styles.text}>Imagem</Text>
              <View style={styles.imagem}>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => setStartOver(false)}
                >
                  <FontAwesome name="camera" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={pickImage}
                >
                  <FontAwesome name="image" size={24} color="black" />
                </TouchableOpacity>
                {cadastra?.imagem && (
                  <Image
                    source={{ uri: cadastra.imagem.uri }}
                    style={styles.img}
                  />
                )}
              </View>
              <Button size="define" title="Salvar" onPress={onSubmit} />
              <ButtonText
                onPress={() => navigation.navigate("Home")}
                title="Voltar"
              />
            </SafeAreaView>
          ) : (
            <Camera
              style={styles.container}
              type={type}
              ref={(r) => {
                if (r) camera = r;
              }}
            >
              <View style={styles.buttonTop}>
                <View style={styles.buttonTopPosition}>
                  <TouchableOpacity
                    onPress={() => {
                      setStartOver(true);
                      console.log("clicou");
                    }}
                  >
                    <Text style={styles.textClose}>X</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.buttonFlip}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Text style={styles.textFlip}> Inverter </Text>
                </TouchableOpacity>
                <View style={styles.viewTakePicture}>
                  <View style={styles.positionTakePicture}>
                    <TouchableOpacity
                      onPress={takePicture}
                      style={styles.buttonTakePicture}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    fontSize: 16,
    padding: 10,
    width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
  imagem: {
    flexDirection: "row",
  },
  img: {
    width: 100,
    height: 100,
  },
  buttonImage: {
    margin: 10,
  },

  buttonTop: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonTopPosition: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  textClose: {
    color: colors.white,
    fontSize: 20,
  },
  buttonFlip: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  textFlip: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.white,
  },
  viewTakePicture: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  positionTakePicture: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  buttonTakePicture: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});
