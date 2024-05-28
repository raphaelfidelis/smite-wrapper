# Smite API Wrapper

A Smite/Hi-Rez API wrapper built with NestJS.

## Available endpoints

- GET '/': Returns server status for Hi-Rez's games. 
- GET '/player?id=': Returns player information by nickname [id].
- GET '/player/matches?id=': Returns player recent matches.
- GET '/player/status?id=': Returns player current status (online, in-game, etc).
- GET '/player/current?id=': Returns a string containing player information for all 10 players of a player current match (nicknames, mmr, ranked winrate and god selected).

