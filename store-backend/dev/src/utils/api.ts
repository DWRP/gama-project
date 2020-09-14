import axios from 'axios'

require('dotenv').config()

const { API_URL, APP_KEY, APP_TOKEN } = process.env

const api = axios.create({
    headers:{
        "Content-Type":"application/json",
        "x-vtex-api-appKey": APP_KEY,
        "x-vtex-api-appToken":APP_TOKEN
    }
});

export default api