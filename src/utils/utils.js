import axios from 'axios'
export let AxiosRequest = axios.create({
    baseURL : 'https://task-manager-5gcj.onrender.com/api/task',
    withCredentials : true
});