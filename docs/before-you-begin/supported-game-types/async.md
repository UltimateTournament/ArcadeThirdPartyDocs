---
sidebar_position: 1
---

# Async Multiplayer

Leaderboards and other non-concurrent ways of competing.

## What is Async Multiplayer?

Asynchronous multiplayer games mean that players are not playing against each other in real time. They do so instead by competing for the highest score on a time-based Leaderboard, or compete against asynchronous challenges from other players like time trails or score races.

## Advantages

Async Multiplayer games are the most successful on the Arcade for the following reasons:

1. They don't require concurrent players (players don't need to be playing at the same time)
2. They are not latency sensitive (to the server)
3. They allow for far more depth and detail
4. They allow for players in different timezones to compete against each other
5. They result in far larger prize pools
6. Easier integration

## Types of Async Multiplayer Games

### Leaderboard Games

In Leaderboard games, players compete for a high score in a time-based leaderboard. The interval of the leaderboard ranges from days to hours, but is usually 24 hours.

When a player plays a game, they are given a score and that entry is placed on the Leaderboard. Each player can have at most one entry on the Leaderboard. If the player plays again and gets a better score, their entry is moved up. If they play again and get a lower score, their original higher score is kept.

The position on the Leaderboard is determined by the score that a player is given. They can be at any scale: 0-100, 0-1,000, 0-1,000,000, up to you, but it must be a whole number. We suggest using numbers under 10,000,000 for the best readability.

At the end of the Leaderboard, the players with the top scores distribute the winning based on their place. For example, a Leaderboard distribution might look like:

| Place | Winnings |
| ----------- | ----------- |
| 1<sup>st</sup> | 70% |
| 2<sup>nd</sup> | 20% |
| 3<sup>rd</sup> | 10% |
| 4<sup>th</sup> - n<sup>th</sup> | nothing |

The winnings are distributed after taking the 10% commission. [Learn more about commission here.](/docs/commission)

Leaderboard games are the most successful games on the Arcade, as they have a flywheel effect:

When a player competes in a leaderboard game, the leaderboard pot value increases. In turn, this makes the game more attractive to other players, because there is more to be won for getting a winning score. They then play, and thus increase the value of the leaderboard pot even more. This flywheel spins results in daily prizes of upwards of thousands of dollars from an initial $1 play price (for example).

### Tie-Breaking

In the event that there are one or more players that tie in a certain position (say 3 people in 7th), the rewards for 7th, 8th, and 9th will be evenly distributed between all three players.

### Example Leaderboard Game: A Procedural Platformer

The player has to get as far along the map as possible before they are trampled by a giant tumbling boulder. As the map progresses, there are more and more obstacles that are harder to traverse.

The map is randomly generated from a seed that is the same for every player in the leaderboard, so every play within the same leaderboard has the exact same map. The next leaderboard will have a different seed.

Players play against the same environment every time to try to get higher and higher scores. When the leaderboard ends, the players with the highest scores distribute the total leaderboard value based on their rankings.

<!--

## Challenge games

In Challenge games, players either create a challenge, or compete against another player's challenge, in a shared scenario.

The first player will be given a randomly generated environment that they play in to get a certain score. When the next player matchmakes, they will be given the same environment as the first player, and told that there is a score to beat. When that player finishes their game, who ever has the greatest score wins the buy-in of both players.

The winnings are distributed after taking the 10% commission. [Learn more about commission here.](/docs/commission)

### Tie-Breaking

In the event that players tie, they will be returned their initial buy-in with no commission taken.

### Example Challenge Game: A Motorbike Racer

The player is given a randomly generated bike course, and has to get to the end before the opponent. If the player is competing against another challenge, they see the ghost of the challenge creator racing in the background. Who ever gets to the end of the course first wins.

-->
