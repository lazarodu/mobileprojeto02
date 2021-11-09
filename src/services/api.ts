import axios from "axios";

const api = axios.create({
  baseURL: "https://laravelwe22021.herokuapp.com/api"
})

export default api;