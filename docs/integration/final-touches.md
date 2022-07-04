---
sidebar_position: 6
---

# Final Touches

When you're awesome game is finally ready to present to the world (and start earning money from it) we
need the following to publish it to the Arcade:

## Game Info

The absolute minimum, that we need to know about a game is its name and the [type of game](/docs/category/considerations-by-game-type).

## Short Description

You should write a 1-2 sentence description of the game to display on the landing page that players first see when they launch your game.

For example, a description might look like:

> Cyber Worms is a fast-paced PvP game where you control a worm, trying to get other worms to crash into your side. If you crash into another worm or hit a wall, you lose!

## Rules List

You should also provide a list of rules that explain how the game works. This should cover all controls, crucial game mechanics, and any other information a player should need to feel comfortable playing the game for the first time.

An example rules list looks like:


> 1. A worm's length is determined by its mass
> 2. A player defeats another player by strategically placing their worm's body in front of their opponent so the head of the opponent collides with the body of the player's worm.
> 3. When a player defeats another player, the winning player collects the tokens from the defeated player less commission.
> 4. If a player collides with the map boundary, they are defeated and half of their tokens are lost.
> 5. Players can exit at any time but are subject to a 2 second grace period where they cannot control their worm still in play while the exit is pending.
> 6. Player's worms can boost in speed by sacrificing mass
> 7. Having a higher mass does not mean a player has more game tokens.
> 8. Tokens are not settled until a player exits the game
> 9. In a head-to-head collision with another worm, the winning player will be the player who has the larger worm.

## Thumbnails and Background Banner

We need a few images to make your game look super sweet on the Arcade. All provided images should be in `.png` format, and have no transparency.

### Thumbnails

This will be the image that is shown on the Arcade launcher tile at [ultimatearcade.io](https://ultimatearcade.io). This should be 808x672 pixels. This file should be named `thumbnail.png`

A mobile-optimized thumbnail should also be provided that is 672x360 pixels. This file should be named `thumbnail_m.png`

### Background Banner

This is the image that will be shown in the background of the game's page on the launcher. This should be 1920x640 pixels. This file should be named `banner.png`

## (Optional) Explainer Video Points

The Ultimate Arcade team will record and produce a short (<1min) video that will show off game play while explaining how to play, and the mechanics of the game. You should provide your Arcade contact with any additional points or copy that you want included in the video.

Videos will all be made by Ultimate Arcade to maintain consistency of quality and content.

## Code and Binaries

We'll review your code to ensure it's fair, uses the SDK correctly and so on, therefore we'll ask for your code.
You'll keep all copyright and we will be handling it confidentially. We might drop this requirement when our
AI is finally smart enough!

And of course you need to deliver your game and its server:

For the game itself (the frontend/client so to speak), you'll have to deliver a bundle (e.g. a ZIP) that contains
an `index.html` file and all the assets (images, CSS, WASM, ...) that it references.

For the game server, you'll have to provide us a bundle with your binaries and all files it needs at runtime. 
Behind the scenes we're using Docker to run your game server on Linux servers. Therefore, when delivering your server to us,
you must include a `Dockerfile` that defines how do run (and build, if you're not sending binaries) your game.

:::note
If you've never used Docker before, don't worry. For [Unity](https://github.com/UltimateTournament/ArcadeUnitySDK/blob/main/Dockerfile) and for [NodeJS](https://github.com/UltimateTournament/ArcadeNodeJSSDK/blob/main/Dockerfile) we've included example files
that should work out of the box and for other platforms just contact us.
:::
