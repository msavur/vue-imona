import {get, remove} from "@/service/api.service";

export function getById(id) {
    return get('/players/' + id);
}

export function getAllPlayers() {
    return get('/players');
}

export function deletePlayer(id) {
    return remove('/players/' + id);
}
