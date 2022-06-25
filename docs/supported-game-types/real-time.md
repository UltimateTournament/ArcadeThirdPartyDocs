---
sidebar_position: 2
---

# Real-time Multiplayer

While in async-multiplayer games you interact with your opponents only indirectly (e.g. competing for a better score) in real-time multiplayer games players directly interact with each other.

In this category we need to differentiate between two kinds of games:
**Latency sensitive** (fast paced action games) and **not latency sensitive** games (mostly round-based games).

While latency sensitive games are possible (like [cyberworms](https://ultimatearcade.io/cyber-worms) and [cyberworms battle royale](https://ultimatearcade.io/cyber-worms?mode=battle-royale)), they are far more difficult to build and maintain.

If your game doesn't mind if there's a few hundred milliseconds delay, then it's far easier to host them and keep up a great player experience.

For real-time games we support two types of games:
* *Player vs Player (PvP)* - players come and go, might fight each other in an open session
* *Winner takes it all (WTA)* - players come together for one round, compete, and the winner gets all the money in the *pool*
  * this is where the SDK's `lockPool`, `settlePool` and `returnPool` methods are needed

## Considerations if you still decide to create a latency-sensitive game

Some things you need to think about when making real-time games:

1. Latency compensation (if game is latency sensitive) - this is especially important as we only have US East servers at this time.
2. Client-side prediction - as part of latency compensation, you will probably want to implement client-side prediction
3. Bandwidth - real-time multiplayer games can have high bandwidth requirements. This impacts the number of players in game, as well as revenue share agreement (as we bear the cost of egress)
4. Multiple connected players - ensuring that events are processed in order, no concurrency issues or race conditions, and other methods to ensure that events are processed on the server in a way that is verifiably correct and fair
