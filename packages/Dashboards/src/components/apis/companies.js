import axios from "axios"

const {
    REACT_APP_COMPANIES_HOST: companiesBackEndHost,
    REACT_APP_COMPANIES_PORT: companiesBackEndPort,
} = process.env

export default axios.create({
  baseURL: `http://${companiesBackEndHost}:${companiesBackEndPort}`,
});