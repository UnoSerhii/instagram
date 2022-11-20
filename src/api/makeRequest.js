import axios from "axios";

const API_ENDPOINT = 'http://localhost:3000';

export const makeRequest = (config) => {
    config.url = `${API_ENDPOINT}${config.url}`;
    console.log(config, 'config');

    return axios(config)
}