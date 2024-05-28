import { Injectable } from "@nestjs/common";
import { Session } from "src/infra/Session";

@Injectable()
export class PlayerStatusQuery {
    constructor() {}
    
    async execute(id: string) {
        const session = new Session()
        const info = session.buildParams('getplayerstatus', [id])
        const request = await session.makeRequest('getplayerstatus', ...info)
        return request[0]
    }
}