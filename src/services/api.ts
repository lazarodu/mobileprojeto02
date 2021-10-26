import axios from "axios";

const api = axios.create({
  baseURL: "https://web22021.herokuapp.com/api"
})

export default api;