import axios from "axios";

const API = axios.create({
  baseURL: "https://weather-backend-lvzn.onrender.com",
});

export default API;
