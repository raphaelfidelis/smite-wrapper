import { Controller, Get, Query } from '@nestjs/common';
import { FullPlayerInfoQuery } from './queries/getFullPlayerInfo.query';
import { PlayerMatchesQuery } from './queries/getPlayerMatches.query';
import { PlayerStatusQuery } from './queries/getPlayerStatus.query';
import { PlayerCurrentMatchQuery } from './queries/getPlayerCurrentMatch.query';
import { PlayerAchievementsQuery } from './queries/getPlayerAchievements.query';

@Controller('player')
export class PlayerController {
    constructor(
        private readonly fullInfo: FullPlayerInfoQuery,
        private readonly matches: PlayerMatchesQuery,
        private readonly status: PlayerStatusQuery,
        private readonly current: PlayerCurrentMatchQuery,
        private readonly achievements: PlayerAchievementsQuery) {}

    @Get()
    async fullPlayerInfo(@Query() params: any) {
        const { id } = params
        const result = await this.fullInfo.execute(id)
        return result
    }

    @Get('/matches')
    async playerMatches(@Query() params: any) {
        const { id } = params
        const result = await this.matches.execute(id)
        return result
    }

    @Get('/status')
    async playerStatus(@Query() params: any) {
        const { id } = params
        const result = await this.status.execute(id)
        return result
    }

    @Get('/current')
    async currentMatch(@Query() params: any) {
        const { id } = params
        const result = await this.current.executeToString(id)
        return result
    }

    @Get('/achievements')
    async playerAchievements(@Query() params: any) {
        const { id } = params 
        const result = await this.achievements.execute(id)
        return result
    }
}
