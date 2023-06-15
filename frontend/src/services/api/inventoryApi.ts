import axios from 'axios'

const inventoryApi = axios.create({
    baseURL: 'http://localhost:8000/'
})

export default inventoryApi;