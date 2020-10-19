import axios from "axios"

const {
  REACT_APP_ENTITIES_HOST: entitiesBackEndHost,
  REACT_APP_ENTITIES_PORT: entitiesBackEndPort,
} = process.env

// Set config defaults when creating the instance
export default axios.create({
  baseURL: `http://${entitiesBackEndHost}:${entitiesBackEndPort}`,
});