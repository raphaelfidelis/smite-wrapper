import { Injectable } from "@nestjs/common";
import { Session } from "src/infra/Session";
import { PlayerStatusQuery } from "./getPlayerStatus.query";
import { PlayerStatus, Tier } from "src/util/constants";

export interface MatchPlayer {
    god: string
    mmr: number
    wr: number
    name: string
    tier: string
    team: number
}

export interface MatchTeam {
    team1: MatchPlayer[]
    team2: MatchPlayer[]
}



@Injectable()
export class PlayerCurrentMatchQuery {
    constructor(private readonly status: PlayerStatusQuery) {}
    
    async execute(id: string): Promise<MatchTeam | string> {
        const session = new Session()
        const playerStatus = await this.status.execute(id)
        if(playerStatus.status == PlayerStatus.IN_GAME) {
            const info = session.buildParams('getmatchplayerdetails', playerStatus.Match)
            const request = await session.makeRequest('getmatchplayerdetails', ...info)
            const team1: MatchPlayer[] = []
            const team2: MatchPlayer[] = []
            for(const player of request) {
                const p: MatchPlayer = {
                    god: player.GodName,
                    mmr: Math.round(Number(player.Rank_Stat)),
                    wr: player.tierWins == 0 ? 0 : (player.tierWins/(player.tierWins + player.tierLosses))*100,
                    name: player.playerName.length > 0 ? player.playerName : '?',
                    team: player.taskForce, 
                    tier: Tier[player.Tier],
                }

                if(p.team == 1) team1.push(p)
                else team2.push(p)
            }

            const teams: MatchTeam = {
                team1: team1,
                team2: team2
            }

            return teams
        } else { 
            return 'Player not currently in-game.'
        }        
    }

    async executeToString(id: string): Promise<string> {
        const result = await this.execute(id)
        if(typeof result === 'string') return result

        let playersString = []
        const team1 = result.team1.sort((a, b) => b.mmr - a.mmr)
        const team2 = result.team2.sort((a, b) => b.mmr - a.mmr)
        for (const player of team1) {
            const playerString = `${player.god}: ${player.name} (${player.tier}, ${player.mmr}MMR, ${player.wr.toFixed(1)}% WR)`
            playersString.push(playerString)
        }
        const players1 = playersString.join(', ')
        playersString = []

        for (const player of team2) {
            const playerString = `${player.god}: ${player.name} (${player.tier}, ${player.mmr}MMR, ${player.wr.toFixed(1)}% WR)`
            playersString.push(playerString)
        }
        const players2 = playersString.join(', ')
        return players1 + ' == VS == ' + players2
    }
}