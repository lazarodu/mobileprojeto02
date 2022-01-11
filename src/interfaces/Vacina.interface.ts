import { ImageSourcePropType } from "react-native";
import { AnimalProps } from "./Animal.interface";
import { ButtonProps } from "./Button.interface"

export interface VacinaParamProps extends AnimalProps {
  vacinacao: {
    id: number
    nome: string
    data: string
  }
}

export interface IVacinaParam {
  id: number
  nome: string
  data: string
}

export interface VacinaParam {
  id?: number
  animal_id?: number
  nome?: string
  data?: string
}

export interface VacinaProps extends ButtonProps {
  buttonEdit: (item: IVacinaParam) => void
  buttonRemove: (item: IVacinaParam) => void
  vacinacao?: {
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
