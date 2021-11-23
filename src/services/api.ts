import axios from "axios";

const api = axios.create({
  baseURL: "https://laravelmodelo.herokuapp.com/api",
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;