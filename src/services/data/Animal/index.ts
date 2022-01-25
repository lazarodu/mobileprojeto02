
import { IAnimal, ICadastraAnimalParam, ISpecificAnimal } from "../../../interfaces/Animal.interface";
import api from "../../api";

class AnimalData {
  index() {
    return api.get<IAnimal>('/animal')
  }
  store(data: any) {
    return api.post(`/animal`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  update(id: number, data: string) {
    return api.put<IAnimal>(`/animal/${id}`, { castracao: data })
  }
  show(id: number) {
    return api.get<ISpecificAnimal>(`/animal/${id}`)
  }
  deleteCastracao(id: number) {
    return api.delete(`/castracao/${id}`)
  }
}

export default new AnimalData();