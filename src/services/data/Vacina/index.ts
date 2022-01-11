import { IResponse } from "../../../interfaces/Response.interface";
import { VacinaParam } from "../../../interfaces/Vacina.interface";
import api from "../../api";

class VacinaData {
  store(data: VacinaParam) {
    return api.post<IResponse>('/vacina', data)
  }
  update(id: number, data: VacinaParam) {
    return api.put<IResponse>(`/vacina/${id}`, data)
  }
  destroy(id: number) {
    return api.delete<IResponse>(`/vacina/${id}`)
  }
}

export default new VacinaData();