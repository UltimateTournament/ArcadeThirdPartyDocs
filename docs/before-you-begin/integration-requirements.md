---
sidebar_position: 4
---

# Integration Requirements

To ensure fairness on the platform and help us run your games securely, all games need to adhere to a few rules:

## Authoritative Game Servers

Even if your game today runs purely in the browser, you will need to add a server. In order to prevent cheating, a game server must verify the state of the game.

There are lots of frameworks helping you do this (e.g. Mirror for Unity) and we can support you, too.

The team behind Mirror did a great writeup of [Server Authority: Cheats & Anticheats](https://mirror-networking.gitbook.io/docs/faq/cheating), if you want to know more.

## In-Memory game state

The Arcade (currently) doesn't support long running game sessions that live for longer than the lifetime of a server. Therefore we don't provide APIs for storing/loading state and you shouldn't try to store it on disk (that will be wiped).

Just keep all state in memory. We will make sure that everything gets cleaned up in case the server crashes mid-game.

## Game Client Initialization on Start

When a player selects your game on the Arcade, they want to start playing right away. Setting their display name, player skin, etc. is all handled in their UA profile.

Therefore, when the game client is loaded, it should start the game without additional required interaction from the player. At this time the slip has already been created, and the game server provisioned for this session. A countdown timer is acceptable, but should be synced with the server.

Whether you connect to a game server is dependent on the game mode, see [Free to Play/Practice Mode](#free-to-playpractice-mode)

## Low Resource Requirements

The game should not require lots of CPU or memory to run. A good litmus test is that the game can run well on a mobile browser.

## Limit Play Time

You must not give players unlimited time to finish the game or their turn to prevent players from winning a game by just
annoying their opponent out of the game.

Good limits are <2min for finishing turn and <20min for finishing the whole game. But shorter is often better as it makes the
game more engaging and allows for more game sessions to be played.

It's good practice to show a very visible timer on screen so players are not surprised when you make them lose after the time runs out.

## Seeded Randomness

For any randomness that could appear in the game, it must be able to be controlled with a seed provided by the SDK.

The litmus test is that given the same seed, and the same user inputs, the exact gameplay simulation will occur every time. For example enemies will always spawn and attack in the exact same way, or a platformer will always generate the map in the same way.

## Free to Play/Practice Mode

All games should have a "free to play" or "practice" mode. This is where the player does not pay any tokens up front, but does not earn any tokens. In this case, the server host will be `""` (blank string) and you should not connect to a server, everything can run locally.
