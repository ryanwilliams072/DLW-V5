# DTR-V5
## Introducing Slash Commands!
We’ve upgraded our bot to use Slash Commands, making it even more user-friendly! No more pesky prefixes to remember - it’s now easier than ever to access all of the bot’s features!

## Check out the Showcase!
[3.2.2 Preview](https://youtu.be/IYEyL-seZRM)

## How could I deploy this?
1) To get started, you’ll need a Discord bot, which you can create by heading over to the [Discord Developer Application Site](https://discord.com/developers/applications) and click on **“New Application”.**
2) Follow this video to turn your app into a bot:


https://github.com/corehimself/DTR-V4/assets/125627389/90cb437c-3548-4ce0-b13d-1763fc113358

3) Once you have successfully create a bot, you’ll need to install the project, or create an account on [Glitch](https://glitch.com/) and set it up yourself. Glitch is a cloud-based platform that provides tools for creating and hosting web applications. It offers a visual coding interface that allows users to build and edit apps in real-time, collaborate with others, and publish their creations with a single click. [Glitch.com](https://glitch.com/) also provides a community where users can discover, remix, and share projects, as well as access tutorials and resources to help them learn and improve their skills.
4) You’ll need to setup the **Datastore Api**, you can find a [Tutorial here](https://devforum.roblox.com/t/data-store-access-through-open-cloud/1646277)
5) Fork this repo **RECOMMENDED** or the [OUTDATED Glitch Repo](https://glitch.com/edit/#!/discord-to-robloxv3)

**Required Permissions, IP Whitelist to request API should be replicated as shown.**
![image](https://github.com/corehimself/DTR-V4/assets/125627389/06518572-07cf-4009-9d60-66474baefa5b)
![image](https://github.com/corehimself/DTR-V4/assets/125627389/74222df6-a15e-405e-bdc1-60e9d58e7bbe)

6) After forking the Github, the Config is located at Src/Credentials/Config.json. The following should be done before doing anything:
```
{
  "botToken": "", // Token
  "clientId": "", // Application ID can be found in General Information on https://discord.com/developers/applications
  "guildId": "" // Server's ID, can be obtained with Developer Mode on Discord by Right Clicking the desired Server
}
```
![image](https://github.com/corehimself/DTR-V4/assets/125627389/c46d6535-a525-45b9-9061-1da825d0d962)
``universeID`` - set by the /settings db command [Click your game, universeID in link](https://create.roblox.com/creations)

7) Run the following commands on terminal/cmd
``node i`` then ``node main.js``

9) **DOWNLOAD THE MODEL FROM RELEASES OR THE MODEL** -> Place the Server Script into `ServerScriptService`, Place the Client into `StarterPlayerScripts` and ensure `Enable HTTP Requests` is Enabled!

[Want the model instead?](https://www.roblox.com/library/14160690168/)

## How to set it up?
### **Settings**

**/settings db <datastoreKey> <messageServiceKey>**                                    // REQUIRED: Make sure you set your Datastore Service Key & MessageService Key here

**/settings add-universe <name> <universeId>**                                       // REQUIRED: Adds your game to the Database

**/settings remove-universe <universeName>**                                       // Removes selected game

**/settings list-universe**                                                      // Returns a map of keys

**/settings logging <logging_channel> <application_channel> <appeal_channel>** // If you want to use the auto unban system via reactions, set an application channel where logs will be **SENT TO**. Set appeal_channel to the channel you want to send the UI

### **Game**
**/game ban <server> <player/ID> <reason> <time: 1> <length: minute>**        // Ban a player from the specified server for a specified time length

**/game kick <server> <player/ID> <reason>**                              // Kicks the player from the specified server

**/game warn <server> <player/ID> <reason>**                            // Warns the player

**/game unban <server> <player/ID>**                                    // Unbans the player from set server

**/game shutdown <server>**                                         // Shutdown ALL servers based on Server (Teleports them to a temporary place and back)

*I want to ensure that you have the best experience possible with our bot. I highly recommend that you avoid executing commands repeatedly - this can cause a buildup of requests and potentially slow down your experience.*

## Let’s take a closer look at some of the cool features of the bot:
- Verified Name & User ID

This bot utilizes a special ROBLOX API to ensure that the user ID or username you’re trying to ban/kick/unban is valid. No more worrying about making a mistake and targeting the wrong person - this feature will double-check everything for you!

- Discord Integration

This bot is completely Discord-oriented and optimized for use within the Discord platform. It’s user-friendly and easy to navigate, with commands that are simple and intuitive.

- Ban with an Optional Time Parameter

With this bot, you can easily ban a user for a set period of time using an optional time parameter. This is a great feature if you just want to give someone a temporary ban without having to go through the process of unbanning them later.

- Command Logging

This bot also keeps track of all the commands that are executed, so you can always go back and see what has been done in the past by an administrator or a player.

- Unban Appeal System

With this bot, you can now easily setup your Unban Appeal System. Unbanning users have never been easier! Upon reacting with a thumbs up to the message, will keep in contact with ROBLOX’s server and get them out of there!

- Local Database Support

Your settings and universes can be saved for quick retrieval thanks to the [quick.db](https://www.npmjs.com/package/quick.db) module.

- Glitch Support

We love free hosting as much as you do! Which is why I’m happy to say that this bot is fully compatible with [Glitch](https://glitch.com/)! This means you can easily run this bot on Glitch servers without having to pay a dime, and without worrying about traffic overloads or long response times. Plus, you can easily edit the code directly on Glitch’s web interface, making it a breeze to customize the bot to your liking. Give it a try and see how easy it is to get started with the bot on Glitch!

- Player Teleport on Shutdown

While maintaining it's functionality, you can shutdown servers with ease & teleport your players versus having them kicked!

# Support
If you'd like to support my projects, feel free to leave a little something or join my [Support Discord](discord.gg/9FhNbK3nck) as a Thank you!

Cash App: $kinqeli21

Bitcoin: bc1q0dh5p8npjhlp6pm6vqnzqtqk0zgjuapjtd3h8f

ETH: 0x53BD9d140BdfCF4D2b93C6C0Dd8a6909C1305aa3
