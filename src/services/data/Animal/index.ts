
import { IAnimal } from "../../../interfaces/Animal.interface";
import api from "../../api";

class AnimalData {
  index() {
    return api.get<IAnimal>('/animal')
  }
  update(id: number, data: string) {
    console.log(id, data)
    return api.put<IAnimal>(`/animal/${id}`, { castracao: data })
  }
}

export default new AnimalData();