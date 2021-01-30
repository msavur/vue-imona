import {get, post, put, remove} from "@/service/api.service";

export function getById(id) {
    return get('/players/' + id);
}

export function getAllPlayers() {
    return get('/players');
}

export function createPlayer(player) {
    return post('/players', player);
}

export function editPlayer(id, player) {
    return put('/players/' + id, player);
}

export function deletePlayer(id) {
    return remove('/players/' + id);
}
