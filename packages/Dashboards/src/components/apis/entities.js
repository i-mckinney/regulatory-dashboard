import axios from "axios"

const {
  REACT_APP_ENTITIES_HOST: entitiesBackEndHost,
  REACT_APP_ENTITIES_PORT: entitiesBackEndPort,
} = process.env

export default axios.create({
  baseURL: `http://${entitiesBackEndHost}:${entitiesBackEndPort}`,
});