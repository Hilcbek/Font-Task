import axios from 'axios'
export let AxiosRequest = axios.create({
    baseURL : ['http://localhost:10000/api/task','https://task-manager-5gcj.onrender.com'],
    withCredentials : true
});