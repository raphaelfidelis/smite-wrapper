import { Injectable } from "@nestjs/common";
import { Session } from "src/infra/Session";

@Injectable()
export class PlayerAchievementsQuery {
    constructor() {}
    
    async execute(id: string) {
        const session = new Session()
        const info = session.buildParams('getplayerachievements', [id])
        const request = await session.makeRequest('getplayerachievements', ...info)
        return request
    }
}