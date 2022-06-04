---
sidebar_position: 1
---

# Beginning Integration

All integrations require the following:

### Authoritative Game Servers

In order to prevent cheating, a game server must be able to verify the state of the game.

### Low Resource Requirements

The game should not require lots of CPU or Memory to run. A good litmus test is that the game can run well on a mobile browser.

### Seeded Randomness

For any randomness that could appear in the game, it must be able to be controlled with a seed provided by the SDK.

The litmus test is that given the same seed, and the same user inputs, the exact gameplay simulation will occur every time. For example enemies will always spawn and attack in the exact same way, or a platformer will always generate the map in the same way.

While it does not need to be exactly deterministic, it must be unnoticeably the same.

### Free to Play/Practice Mode

All games should have a "free to play" or "practice" mode. This is where the player does not pay any tokens up front, but does not earn any tokens.

For Leaderboard games, a server is not needed, and the game can run entirely locally without needing to report scores.
