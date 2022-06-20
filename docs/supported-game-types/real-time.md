---
sidebar_position: 2
---

# Real-time Multiplayer

While real-time multiplayer games are possible (like [cyberworms](https://ultimatearcade.io/cyber-worms) and [cyberworms battle royale](https://ultimatearcade.io/cyber-worms?mode=battle-royale)), they can be more difficult to build, integrate, maintain, and monetize.

Some real-time games can be very easy to make, so please reach out so we can discuss!

## Considerations

Some things you need to think about when making real-time games:

1. Latency compensation (if game is latency sensitive) - this is especially important as we only have US East servers at this time.
2. Client-side prediction - as part of latency compensation, you will probably want to implement client-side prediction
3. Bandwidth - real-time multiplayer games can have high bandwidth requirements. This impacts the number of players in game, as well as revenue share agreement (as we bear the cost of egress)
4. Multiple connected players - ensuring that events are processed in order, no concurrency issues or race conditions, and other methods to ensure that events are processed on the server in a way that is verifiably correct and fair

## Advantages

1. Potentially higher engagement between players
2. Potentially lower player game session durations

## Disadvantages

1. Potentially Harder to develop a game server
2. Potentially latency sensitive
3. Requires concurrent players for activity (players cannot play by themselves)
4. Lower player retention
5. Potential teaming - if players are able to gang up on individuals, those individuals will have a very bad experience and may never play your game again
