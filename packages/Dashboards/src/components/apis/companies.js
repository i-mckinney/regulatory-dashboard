import axios from "axios"

const {
    REACT_APP_API_GATEWAY_HOST: companiesURL,
} = process.env

// Set config defaults when creating the instance
export default axios.create({
  baseURL: `http://${companiesURL}`,
});