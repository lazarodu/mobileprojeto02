import { ImageSourcePropType } from "react-native";
import { ButtonProps } from "./Button.interface"

export interface CastraProps extends ButtonProps {
  data?: string
  buttonEdit: () => void
  buttonRemove: () => void
}

export interface CastraPropsAnimal {
  title: string
  image: ImageSourcePropType
  data: string
}
