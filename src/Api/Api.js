import axios from "axios";

const API_URLS = {
  BASE_URl: "http://localhost:8080",
  REGISTER_USER: "sign-up"
};

const signUp = async user => {
  return axios.post(`${API_URLS.BASE_URl}/${API_URLS.REGISTER_USER}`, user);
};

export default signUp;
