import axios from "axios";

const {
  REACT_APP_USERBACKEND_HOST: userBackEndHost,
  REACT_APP_USERBACKEND_PORT: userBackEndPort,
} = process.env

export default axios.create({
  baseURL: `http://${userBackEndHost}:${userBackEndPort}`,
});