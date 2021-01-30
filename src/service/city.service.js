import {get} from "@/service/api.service";


export function getAllCities() {
    return get('/cities');
}
