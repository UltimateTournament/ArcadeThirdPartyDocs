---
sidebar_position: 2
---

# Leaderboard and Challenges

For Leaderboard and Challenge games, integration can be summarized to the following:

1. The SDK will provide you with information about the player that is needed for displaying and communication (display name, SlipID, etc.)
2. You will record the inputs by time (relative to game start) or by frame with the arcade SDK.
3. The game server must be able to simulate the exact game based on the recorded inputs from the client, to ensure that the state matches (there is no cheating).
4. The game server must be able to adjust constant time to pause when waiting for new inputs, and simulate as fast a possible (`0` constant time) when inputs are provided.

## Challenge Games

For Challenge games, half of the players will be creating a challenge, and half will be competing against a challenge. Chances are you will want to show the challenging player the play-through of the first player. For this, the SDK will return you the same input record that was given to the server when the first player played.

You can use this record to show the ghost of the other player in a platformer, split-screen tower defense round runs, or any other way you might want to show this recording.

The only requirement is that this recording does not impact the gameplay of the challenging player.
