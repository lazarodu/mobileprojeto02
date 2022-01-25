
import { ImageSourcePropType } from 'react-native'

export interface AnimalProps {
  id: number
  nome: string
  imagem: string
  castracao?: string
}

export interface IAnimal {
  status: string,
  message: string,
  data: {
    id: number,
    nome: string,
    imagem: string,
    castracao: string,
    vacinacao: {
      id: number,
      nome: string,
      data: string
    }[]
  }[]
}

export interface ISpecificAnimal {
  status: string,
  message: string,
  data: {
    id: number,
    nome: string,
    imagem: string,
    castracao: string,
    vacinacao: {
      id: number,
      nome: string,
      data: string
    }[]
  }
}

export interface IInterfaceAnimal {
  id: number,
  nome: string,
  imagem: string,
  castracao?: string,
  vacinacao?: {
    id: number,
    nome: string,
    data: string
  }[]
}

export interface ICadastraAnimalParam {
  nome?: string
  nascimento?: string
  imagem?: {
    uri?: string
    base64?: string | any
  }
  file?: string
}