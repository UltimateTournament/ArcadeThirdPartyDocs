---
sidebar_position: 8
---

# Javascript Example Game Integration

In the next section we'll guide you through the relevant changes that you have to make to your game.

We have an example game of TicTacToe implemented in TypeScript with NodeJS. You can get it from [github.com/UltimateTournament/NodeJS-Example-TicTacToe](https://github.com/UltimateTournament/NodeJS-Example-TicTacToe). You can also check out [the PR](https://github.com/UltimateTournament/NodeJS-Example-TicTacToe/pull/2) which contains most of these changes.

Note that the example game is a "pool" game (more on that below) but we'll list the options for all game modes and note when each is applicable.

## Integrating the game into the Ultimate Arcade

### Dockerfile for your server

As every server is slightly different and we need to run them all, you need to provide us with a Dockerfile. If you haven't used Docker before, that's not a problem. Just use the Dockerfile from [our NodeJS SDK](https://github.com/UltimateTournament/ArcadeNodeJSSDK/blob/main/Dockerfile) and adapt the `npm run build` command to match your project.

Just place this file next to your `package.json` and include it in all deliveries of your game to us.

### Add our SDKs

On the frontend run `npm i --save @ultimatearcade/client-sdk` and on the backend run `npm i --save @ultimatearcade/server-sdk`.


### Initialize the SDK

This should be the very first thing you do. You don't want your players to start playing only to be kicked a bit later
because something wasn't quite right.

#### On the server

```typescript
import { getSDK } from '@ultimatearcade/server-sdk'
const uaSDK = getSDK()
// this only resolves when the game server is actually needed (e.g. a player clicked on the game)
// which can be hours after the process has started
const ss = await uaSDK.getServerStatus()
console.log("game allocated: ", ss)
await yourServer.listen({ port: process.env.PORT }) // ensure to listen on the provided port
```

#### On the frontend

```typescript
import {getSDK} from '@ultimatearcade/client-sdk'
const uaSDK = getSDK()
const { server_address, player_token } = await uaSDK.getSessionInfo()
// The `player_token` is a secret string that authenticates the user. Send it to your backend so it can use it later
// The `server_address` is the address at which you'll reach your backend server, e.g. `your.host.com:1234`
```

### Activate the player's game session


Next you activate the `player_token` on your server. Activation will give you more player information like this:

```typescript
const playerInfo = await uaSDK.activatePlayer(initialMessage.player_token)
const playerName = actResp.display_name
const playerID = actResp.player_id
```

You MUST use the playerID from this call to identify the player to ensure that the same player can't connect twice. We try to prevent this on our end, too, but there are always some small time windows when this might happen.

You should also not call this method twice. So it's a good idea to store the `player_token` in your player object, and if you get a connection check if it's just a reconnect after a dropped connection by comparing the player tokens.

### Starting the game, locking the pool

:::note
This is only relevant for pool games. Pool games are games that follow the pattern of
1. waiting for enough players
2. starting the game
3. playing and determining a winner
4. closing the game
:::

After all/enough players have joined we need to close the money pool so no new players cannot join in the middle of the running game:

```typescript
await uaSDK.lockPool()
```

### Reporting game results

Figuring out who won/lost (in pool or PvP games) or what the score (in leaderboard games) of a player is of course completely game-specific and up to you make sure the mechanics for this are good and fair.

But once you've determined a game result, here's what to do with that information

#### Player lost against an opponent


```typescript
await uaSDK.playerDefeated(loser.player_token, winner.player_token)
```

#### Player killed themselves

This is only relevant if your game is player competing against each other (like in pvp and pool games) but also has some game level obstacles.
E.g. in Cyber Worms it's possible to run into a wall and die.

```typescript
await uaSDK.playerSelfDefeat(loser.player_token)
```

It depends on the game mode what happens with the player's tokens. In PvP-Mode they lose a part of it as commission and get back the rest. In Pool-Mode they just lose all the money to the pool and the only difference to loosing against a player is in the statistics.

#### Ending the game with a winner

:::note
This is only relevant for pool games
:::


```typescript
await uaSDK.settlePool(winner.player_token)
// this stops the server and we'll start a new one for the next game
await uaSDK.shutdown()
```

#### Ending the game without a winner

:::note
This is only relevant for pool games and even there you should design your game in a way that draws are very rare.
:::

If it's not possible to determine a winner you'll have to return the pool like this:

```typescript
await this.uaSDK.returnPool("reason why we had to return. E.g. 'draw'")
// this stops the server and we'll start a new one for the next game
await uaSDK.shutdown()
```

#### Reporting the final score of the player

:::note
This is only relevant for leaderboard games.
:::

```typescript
await this.uaSDK.reportPlayerScore(player.player_token, {score: 999})
// this stops the server and we'll start a new one for the next game
await uaSDK.shutdown()
```

Remember to design the game in a way that
1. higher-score == better
2. it's very improbable that two players reach the same score

