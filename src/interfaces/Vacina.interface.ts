import { ImageSourcePropType } from "react-native";
import { AnimalProps } from "./Animal.interface";
import { ButtonProps } from "./Button.interface"

export interface VacinaParamProps extends AnimalProps {
  id: number
  nome: string
  data: string
}

export interface VacinaProps extends ButtonProps {
  buttonEdit: (item: VacinaParamProps) => void
  buttonRemove: (item: VacinaParamProps) => void
  vacinacao: {
    id: number
    nome: string
    data: string
  }[]
}

export interface VacinaPropsAnimal {
  title: string
  image: ImageSourcePropType

  nome: string
  data: string
}