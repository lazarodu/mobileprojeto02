import api from "../../api";
import { IRegister, IAuthenticate, IAuthState } from "../../../interfaces/User.interface"

class UserData {
  register(data: IRegister) {
    return api.post<IRegister>('register', data);
  }
  login(data: IAuthenticate) {
    return api.post<IAuthState>('login', data);
  }
}

export default new UserData();