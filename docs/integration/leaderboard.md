---
sidebar_position: 4
---

# Leaderboard Game Integration

For Leaderboard and Challenge games, integration can be summarized to the following:

1. The SDK will provide you with information about the player that is needed for displaying and communication (display name, SlipID, etc.)
2. You will record the inputs by time (relative to game start) or by frame with the arcade SDK.
3. The game server must be able to simulate the exact game based on the recorded inputs from the client, to ensure that the state matches (there is no cheating).
4. The game server must be able to adjust constant time to pause when waiting for new inputs, and simulate as fast a possible (`0` constant time) when inputs are provided.
