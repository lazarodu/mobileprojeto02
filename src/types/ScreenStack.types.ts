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
  Animal: AnimalProps
  Castra: {
    title: string
    image: ImageSourcePropType
    castracao?: string
    data?: string
  }
  Vacina: {
    title: string
    image: ImageSourcePropType
    castracao?: string
    vacinacao?: {
      nome: string
      data: string
    }[]
  }
}
type AnimalScreenNavigationProp = StackNavigationProp<AnimalStackParamList>
export type AnimalTypes = {
  navigation: AnimalScreenNavigationProp
}