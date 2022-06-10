---
sidebar_position: 10
---

<!-- https://googledocstomarkdown.com/ -->

# Unity Example Game Integration

Next, we'll show you how to make a Unity game work with the Ultimate Arcade.

We'll use [Mirror](https://mirror-networking.gitbook.io/), because it’s awesome and open-source but you can use any framework that you want (or none at all) to implement client-server networking.

Another reason is that they bring a few nice examples and we don't want to focus building the game itself.

## Step by Step

### Create a new game
We're using Unity version 2021.3

![](https://lh6.googleusercontent.com/gTqKQWtJT5vHvxZftwaDeVUiAawCU_f4-vkhDnUvCePTZ3Kfw3Mn5HLipTqV4o_KbNfmv-IJlxkc8cfyU5YMkrfUk98re3Ectkr-acxfDu4ZauCMJCY0SnPX1nWqx4VYafB8NZUBqISrzWTW8Q)

### Install Mirror

First add it to your account from the [Unity Asset Store](https://assetstore.unity.com/packages/tools/network/mirror-129321).

Next, import it into your project:

![](https://lh3.googleusercontent.com/kaqux0aSfnXjBbCXMjP2SHcAxd-AbyOyc_2jKu63TOv9FFju0EhBa4-ffCNZq6HjSBiFBq9YS2G2F4t13P6ydiANErQx52R-NrF_PPCJBtzAjGpSJVu79gIDtzZLt5RxwjChC5hDHb5PeYzgQw)

When importing, remove all examples, but the "Tanks" example. We'll make it the easiest high-score game ever! You have 300 seconds to fire 5 shots. Whoever has the most time left after finishing this "challenge" gets the highest score! Exciting!

![](https://lh6.googleusercontent.com/ycnloxch_R6jr5Bi5YqUF7aXPH3xnsHQUG-hUX1qlaY7FHeuUgWdfEa5ZM1Cp0NJRXNAYIvYNk-P7W8TAh7G53vrKEJ1W26dbNTEitrXi0MfjPw2MOyyNJk_HJ7v8IYmocHrhPt_M4ir1T5V8Q)

Now move the example to your root folder so you don’t get any namespace issues when we start modifying the code.

### Install the Ultimate Arcade SDK

In the package manager add our SDK via its Git URL:
`https://github.com/UltimateTournament/ArcadeUnitySDK.git`

### Open scene and add to build

Now that all the external code is there, lets setup our project correctly.

Open the scene, then go to the build settings and click "Add Open Scene" and remove the empty scene that Unity initially created.

![](https://lh6.googleusercontent.com/LPx7iWQiwnNjPRNdkuGIlY-YUDYtRLHwLp2sotK_86rZcF_DiUTxgPuqAxrWvwvod_UIoKP8hYO--NIWIL-0OUn1I0wE039yzUAa6T1WNxkHw6MFejnu_PIOFeqlMeVkgr39zjbwYAsdrNRvpA)

### Configuring the network

The game will run on the web and browsers only support WebSockets, so go to the `Network Manager`, remove the `KCP Transport` and add a `Simple Web Transport` script.


![](https://lh5.googleusercontent.com/BJ8CeuGsKpwQZbYWDS22Dz6_TvlBgVjnJnJkmUKfYq6_cpmT-Pq_SjC34pyrK7NbEz3PhuDc9nb-16M3aAZ-Q2nK6TNQ9tpKfaEPTxLFzNjN6JlVyEHBINJtSz2irKoMa6WuRdvLJKrIFpoRkA)

Ensure to update the `Transport` reference in the `Network Manager` as well:

![](https://lh4.googleusercontent.com/3vyLJW0jJ-WQpUG4KKpcdAzkzXGIr53Agt9gOLmDLiQTDtik_gn6GgPdmKi5KiIcgrS2Y8tBCQYbF1TFEakddYqcLSyWFSw_yVuKz9hNLCN0OlwX3nTnM6in6Su-NsfI9Qwi1nLrCzt8wnQHHA)

We need to automatically connect but only after the SDK has finished its magic. Therefore disable its own auto-start:

![](https://lh3.googleusercontent.com/9xnlQ9c_2BpvAGA9VLmVAJ7nwbhk3TAcBb56Fnndqp4GN_OdbYDD_rXGljnGebrVWeJTbePQfUOxMqC5c5qew9yoAwKT3Ynn9qG20JiP7AQMSNzLLrIGj91FHCtIrgVR7LAbrOYnSrT6-BNyKA)

And add the SDK's `Auto Connect` script as a new component to the `Network Manager`.

### Adapting the game

Ideally, you should only need very few changes to your game. They boil down to

#### Use the fixed random seed

Every player of the same leaderboard should get the same level, enemy behavior etc, so if you are using randomness in your game, make sure to use the seed found in `AutoConnect.RandomSeed`.

#### Get player token from client

The frontend needs to get the matchmaking token from the arcade and send it to the server.

We can get it via `ExternalScriptBehavior.Token()` and send it to the server with a Mirror `[Command]`.

#### Activate player session

You need to activate the player's session with the provided token with `UltimateArcadeGameServerAPI.ActivatePlayer(...)`. This is neede to ensure the connection is legitimate and gives you information about the player, like their display name.

#### Check win situation on server only

Make sure that the server is authoratative! We'll do this by having another `[Command]`, so the client can't just update the variable with which we count the shots fired.

#### Report score and shutdown server

When the player has finished we call `UltimateArcadeGameServerAPI.ReportPlayerScore(...)` to report their score.

ℹ️ This is basically the only place that differs between leaderboard games and real-time games. For those you'd call one of these methods: `SettlePlayer`, `DefeatPlayer` or `SelfDefeatPlayer`.

Now that the session has finished we tell the player that the game is over with a `[TargetRpc]` call, so the game client can use `ExternalScriptBehavior.CloseGame()` to close the iframe. After that, we tell the SDK to shutdown the server with `UltimateArcadeGameServerAPI.Shutdown(...)`.

##### Example Code

Below you can see the changes to the `Tank.cs` file. (We skipped over the unchanged parts, but don't remove them)

```cs
using UltimateArcade.Frontend;
using UltimateArcade.Server;
// ...
namespace Mirror.Examples.Tanks
{
    public class Tank : NetworkBehaviour
    {
        //...
        private UltimateArcadeGameServerAPI serverApi;
        private UltimateArcadeGameClientAPI clientApi;
        private DateTime joinTime;
        private int shotsFired = 0;
        private string token;

        private void Start()
        {
            if (base.isServer)
            {
                this.serverApi = new UltimateArcadeGameServerAPI();
                AutoConnect.OnServerReady += AutoConnect_OnServerReady;
            }
            else
            {
                var token = ExternalScriptBehavior.Token();
                this.clientApi = new UltimateArcadeGameClientAPI(token, ExternalScriptBehavior.BaseApiServerName());
                InitPlayerCmd(token);
            }
        }
        private void AutoConnect_OnServerReady()
        {
            UADebug.Log("If we would use any randomness, then we would use this seed: " + AutoConnect.RandomSeed);
            // and we would only allow players to join after we setup all randomness
        }
        [Command]
        private void InitPlayerCmd(string token)
        {
            this.joinTime = DateTime.Now;
            this.token = token;
            StartCoroutine(serverApi.ActivatePlayer(token,
                pi => UADebug.Log("player joined: " + pi.DisplayName),
                err => UADebug.Log("ERROR player join. TODO KICK PLAYER: " + err)));
        }
        // this is called on the server
        [Command]
        void CmdFire()
        {
            GameObject projectile = Instantiate(projectilePrefab, projectileMount.position, projectileMount.rotation);
            NetworkServer.Spawn(projectile);
            RpcOnFire();
            this.shotsFired++;
            if (this.shotsFired == 5)
            {
                //TODO player should automatically lose when they take longer than the max time

                // score is time left - a bigger score is always better in the arcade
                var maxTime = 5 * 60 * 1000;
                var score = maxTime - (DateTime.Now - this.joinTime).Milliseconds;
                StartCoroutine(serverApi.ReportPlayerScore(this.token, score,
                    () =>
                    {
                        UADebug.Log("player score reported");
                        this.ClientGameOver();
                        StartCoroutine(this.serverApi.Shutdown(
                            () => UADebug.Log("Shutdown requested"),
                            err => UADebug.Log("couldn't request shutdown:" + err)
                            )
                        );
                    },
                    err => UADebug.Log("ERROR player join. TODO KICK PLAYER: " + err)));
            }
        }
        [TargetRpc]
        void ClientGameOver()
        {
            ExternalScriptBehavior.CloseGame();
        }
        //...
    }
}
```


### Building the game

We require builds to be self-contained. The easiest way to achive that is to set `Project Settings -> Player Settings -> Scripting Backend` to `IL2CPP`:

![](https://lh6.googleusercontent.com/K7_nTdgj41wcjRBJLALdwvR2O6cSHQDE0tV4HTwa8qyQpnA5txXa59KtDxSq-bFU_CiAwNV2xjPcZzjHicoDVjrgzYZIZOoytABuIASLRSyxgofQMK9dwedMD7YZWA_EnpdgVGihVJk2qHueaA)

Now you can export your game!

For the server select `Dedicated Server` and select `Linux` as the OS. The exported filename must be `LinuxServerBuild.x86_64`.

For the client select `WebGL` and just hit build - the default config should be fine.

And you're DONE! Congrats on integrating your first game into the arcade!
