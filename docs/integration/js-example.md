---
sidebar_position: 8
---

# JavaScript Example Game Integration

In the next section we'll guide you through the relevant changes that you have to make to a game of Tic Tac Toe to make it integrate into the Arcade.

The example game is implemented in TypeScript with NodeJS for the backend and VueJS for the frontend. You can get it from [github.com/UltimateTournament/NodeJS-Example-TicTacToe](https://github.com/UltimateTournament/NodeJS-Example-TicTacToe). For the TLDR of this section you can also check out [the PR](https://github.com/UltimateTournament/NodeJS-Example-TicTacToe/pull/2) which contains most of these changes.

Note that this game is a "winner takes it all"-style game where everyone who is competing pays into a "pool" (more on that below). Check the list of [code adaptions](./code-adaptions) for other games.

## Integrating the game into the Ultimate Arcade

We'll skip over building the actual game of TicTacToe. You got this.

### Add our SDKs

On the frontend run `npm i --save @ultimatearcade/client-sdk` and on the backend run `npm i --save @ultimatearcade/server-sdk`.

### Initialize the SDK

This should be the very first thing you do. You don't want your players to start playing only to be kicked a bit later
because something wasn't quite right.

#### On the server

The easiest way to be sure that everything is consistent is to only start the server when the SDK tells us that the server is ready:

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

We'll just create another store for interacting with the UA API:

```typescript
export const uaState = defineStore({
  id: 'ultimate-arcade',
  state: () => ({
    _uaSDK: getSDK(),
    playerInfo: {} as PlayerInfo,
    serverAddress: '',
    token: '',
  }),
  actions: {
    async init() {
      if (!this.token) {
        let si = await this._uaSDK.getSessionInfo()
        this.serverAddress = si.server_address
        this.token = si.player_token
        this.playerInfo = await this._uaSDK.getPlayerProfile()
      }
    },
    async gameOver() {
      await this._uaSDK.gameOver()
    }
  }
})
```

### Activate the player's game session

We'll extend the game's `join` method to ensure we get a player token and that it's good.
And while we're at it, we also add player display names:

```typescript
export class TicTacToe {
  // ...
  async join(msg: { playerID?: string, token: string }): Promise<{
      response: { playerID: string, state: gameStates, symbol: string } | { refused: true },
      gameState?: PublicGameState,
      refused: boolean
  }> {
      if (!msg.token) {
          return { refused: true, response: { refused: true } }
      }
      if (msg.playerID) {
          // ...
      }
      let playerName = ""
      try {
          const actResp = (await this.uaSDK.activatePlayer(msg.token))
          playerName = actResp.display_name
      } catch (err) {
          console.log("couldn't activate player: ", err)
          return { refused: true, response: { refused: true } }
      }
      // ...
  }
  // ...
}
```

### Starting the game, locking the pool

After both players have joined we need to close the money pool so no new players can join in the middle of the running game:

```typescript
await uaSDK.lockPool()
```

### Reporting game results

Latest now we realize that maybe TicTacToe wasn't the best choice for a competitive game:

It's easy for a draw to happen. In you're game you should make this far harder, but we anyhow have to handle the end of our game now, determine who won and settle or return the pool accordingly:

```typescript
async play(msg: { playerID: string, moveX: number, moveY: number }): Promise<{response?: never; gameState?: PublicGameState; gameOver: boolean }> {
    // ...
    const winnerSymbol = this.getWinner()
    if (winnerSymbol != "") {
        this.currentPlayer = ""
        let winner, loser;
        if (winnerSymbol == "X") {
            this.state = gameStates.xWon
            loser = this.getPlayer("O")?.token!
            winner = this.getPlayer("X")?.token!
        } else {
            this.state = gameStates.oWon                
            loser = this.getPlayer("O")?.token!
            winner = this.getPlayer("X")?.token!
        }
        // someone won
        await this.uaSDK.playerDefeated(loser, winner)
        await this.uaSDK.settlePool(winner)
    } else if (this.boardFull()) {
        this.state = gameStates.draw
        this.currentPlayer = ""
        // it's a draw :(
        await this.uaSDK.returnPool("draw")
    }
    // ...
}
```
