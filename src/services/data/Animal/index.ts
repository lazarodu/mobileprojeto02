
import { IAnimal, ISpecificAnimal } from "../../../interfaces/Animal.interface";
import api from "../../api";

class AnimalData {
  index() {
    return api.get<IAnimal>('/animal')
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