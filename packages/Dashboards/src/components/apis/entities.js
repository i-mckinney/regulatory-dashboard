import axios from "axios"

const {
  REACT_APP_ENTITIES_HOST: entitiesBackEndHost,
  REACT_APP_ENTITIES_PORT: entitiesBackEndPort,
} = process.env

console.log(process.env.PORT, `http://${entitiesBackEndHost}:${entitiesBackEndPort}`)
export default axios.create({
  baseURL: `http://${entitiesBackEndHost}:${entitiesBackEndPort}`,
});