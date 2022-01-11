import axios from "axios";

const api = axios.create({
  baseURL: "https://laravelwe22021.herokuapp.com/api",
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;