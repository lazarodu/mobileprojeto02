import { useAuth } from "../../../hook/auth";
import { IAnimal } from "../../../interfaces/Animal.interface";
import api from "../../api";

class AnimalData {
  index() {
    return api.get<IAnimal>('/animal')
  }
}

export default new AnimalData();