import axios from 'axios'
export let AxiosRequest = axios.create({
    baseURL : 'http://localhost:5000/api/task',
    withCredentials : true
});