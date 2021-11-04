import axios from 'axios'
import { AxiosResponse } from 'axios'
axios.interceptors.response.use((response: AxiosResponse) => {
    const { data } = response
    return data
})
export function get() {
    return axios({
        method: 'get',
        url: '/api/get',
    });
}

export function post() {
    return axios({
        method: 'post',
        url: '/api/post',
    });
}

export function text() {
    return axios({
        method: 'post',
        url: '/api/text',
    });
}