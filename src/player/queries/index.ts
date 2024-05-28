import { FullPlayerInfoQuery } from "./getFullPlayerInfo.query";
import { PlayerAchievementsQuery } from "./getPlayerAchievements.query";
import { PlayerCurrentMatchQuery } from "./getPlayerCurrentMatch.query";
import { PlayerMatchesQuery } from "./getPlayerMatches.query";
import { PlayerStatusQuery } from "./getPlayerStatus.query";

export const Queries = [FullPlayerInfoQuery, PlayerMatchesQuery, PlayerStatusQuery, PlayerCurrentMatchQuery, PlayerAchievementsQuery]