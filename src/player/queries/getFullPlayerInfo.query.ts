import { Injectable } from "@nestjs/common";
import { Session } from "src/infra/Session";

@Injectable()
export class FullPlayerInfoQuery {
    constructor() {}
    
    async execute(id: string | string[]) {
        const session = new Session()
        const ids = Array.isArray(id) ? id : [id]
        const info = session.buildParams('getplayer', ids)
        const request = await session.makeRequest('getplayer', ...info)
        return request
    }
}