import { Injectable } from "@nestjs/common";
import { Session } from "src/infra/Session";

@Injectable()
export class PlayerMatchesQuery {
    constructor() {}
    
    async execute(id: string) {
        const session = new Session()
        const info = session.buildParams('getmatchhistory', [id])
        const request = await session.makeRequest('getmatchhistory', ...info)
        return request
    }
}