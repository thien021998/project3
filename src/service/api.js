import axios from 'axios'
export default axios.create({
    baseURL: 'http://localhost:9999/api/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        "content-type": "application/json"
    }
});