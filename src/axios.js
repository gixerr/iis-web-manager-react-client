import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/'
})
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;