---
sidebar_position: 1
---

# Integration Requirements

To ensure fairness on the platform and help us run your games securely, all games need to adhere to a few rules:

### Authoritative Game Servers

Even if your game today runs purely in the browser, you will need to add a server. In order to prevent cheating, a game server must verify the state of the game.

There are lots of frameworks helping you do this (e.g. Mirror for Unity) and we can support you, too.

The team behind Mirror did a great writeup of [Server Authority Cheats & Anticheats](https://mirror-networking.gitbook.io/docs/faq/cheating).



### Game Client Initialization on Start

When a player selects your game on the arcade, they want to start playing right away. Setting their display name, player skin, etc. is all handled in their UA profile.

Therefore, when the game client is loaded, it should start the game without additional required interaction from the player. At this time the slip has already been created, and the game server provisioned for this session. A countdown timer is acceptable, but should be synced with the server.

### Low Resource Requirements

The game should not require lots of CPU or memory to run. A good litmus test is that the game can run well on a mobile browser.

### Seeded Randomness

For any randomness that could appear in the game, it must be able to be controlled with a seed provided by the SDK.

The litmus test is that given the same seed, and the same user inputs, the exact gameplay simulation will occur every time. For example enemies will always spawn and attack in the exact same way, or a platformer will always generate the map in the same way.

While it does not need to be exactly deterministic, it must be noticeably the same.

### Free to Play/Practice Mode

All games should have a "free to play" or "practice" mode. This is where the player does not pay any tokens up front, but does not earn any tokens.

<!-- TODO: Does this mean there will be  no leaderboard for these practice plays? -->

For Leaderboard games, a server is not needed, and the game can run entirely locally without needing to report scores.
