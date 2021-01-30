import {post} from "@/service/api.service";

export function createGame(game) {
    return post('/games', game);
}
