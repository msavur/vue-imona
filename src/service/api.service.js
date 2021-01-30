import axios from "axios";
import {BASE_URL} from "@/service/config";


export function get(path = '') {
    return axios.get(BASE_URL + path).catch(err => {
        console.log(err);
        throw new Error('Http Get Error : api.service');
    })
}

export function post(path = '', params) {
    return axios.post(BASE_URL + path, params).catch(err => {
        console.log(err);
        throw new Error('Http Post Error : api.service');
    })
}

export function put(path = '', params) {
    return axios.put(BASE_URL + path, params).catch(err => {
        console.log(err);
        throw new Error('Http Post Error : api.service');
    })
}

export function remove(path = '') {
    return axios.delete(BASE_URL + path).catch(err => {
        console.log(err);
        throw new Error('Http Get Error : api.service');
    })
}
