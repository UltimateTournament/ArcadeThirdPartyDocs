---
sidebar_position: 2
---

# High-Level Overview

Integrating with the Ultimate Arcade consists of 3 points of communication:

1. Between game client and game server
2. Between game server and Ultimate Arcade
3. Between game client and Ultimate Arcade

## Game Client Start

Game clients are loaded in as an `iframe`. This isolation allows us to very easily load the game in and out of the UI without breaking the smooth experience players expect from the Ultimate Arcade.

Here is high level flow of how it works:

1. A player requests matchmaking
2. A match is found, and a matchmaking token is generated
3. The game client is loaded as an iframe, with the matchmaking token passed in
4. The SDK initialization extracts the information from the matchmaking token, including how to connect to the game server
5. The client connects to the game server and plays the game
6. The game ends, and the game tells the SDK
7. The SDK communicates with the parent web page that the game has ended
8. The parent page removes the iframe and replaces it with the game results, and updated player info (tokens, leaderboard position, etc.)

## Game Server Start

Game servers are dynamically provisioned for each game session, meaning they are not reused for multiple plays (except for real-time multiplayer games).

The general flow of a game looks like:

1. A player requests matchmaking
2. Matchmaking provisions a new server and creates a matchmaking token
3. The game client uses the information from the matchmaking token to connect to the server
4. The game server passes the matchmaking token to the SDK to verify the connection, and fetch player information
5. The game is played
6. The game server reports the final score to Ultimate Arcade
7. The server is terminated
