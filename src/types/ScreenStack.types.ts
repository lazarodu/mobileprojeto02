import { StackNavigationProp } from "@react-navigation/stack"
import { ImageSourcePropType } from "react-native"
import { AnimalProps } from "../interfaces/Animal.interface"

// Login Stack
export type LoginStackParamList = {
  Login: undefined
  Cadastrar: undefined
  HomeStack: undefined
}
type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList>
export type LoginTypes = {
  navigation: LoginScreenNavigationProp
}

// Animal Stack
export type AnimalStackParamList = {
  Home: undefined
  Animal: { id: number }
  Castra: {
    nome?: string
    imagem?: string
    castracao?: string
    data?: string
  }
  Vacina: {
    id?: number
    nome?: string
    imagem?: string
    castracao?: string
    vacinacao?: {
      nome: string
      data: string
    }
  }
  CadastraAnimal: {
    nome?: string
    imagem?: string
  }
}
type AnimalScreenNavigationProp = StackNavigationProp<AnimalStackParamList>
export type AnimalTypes = {
  navigation: AnimalScreenNavigationProp
}