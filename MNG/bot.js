const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();


const { prefix } = config;

//Bot will read the message, and react if some conditions are met
client.on("message", async message =>{

  //Used so it doesn't respond if someone write a command name without the prefix, or if a bot write something that would trigger a reaction
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //It's used for the argument
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //test to see if the bot answer
  if (command === "test") {
    message.channel.send("Yes ?")
  }

  //Just a test to show the first paged showed
  if (command === "season"){
    //embed construction
    const embed = {
  "title": "Moe! Ninja Girls season 1 main page.",
  "description": "Information on the season 1 of Moe! Ninja Girls \nThis embed is the main page from season 1.\n To access the choice and checkpoint, react to the emote under me.",
  "color": 14615963,
  "footer": {
    "text": "Moe Ninja Girls Season 1"
  },
  "image": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "author": {
    "name": "author name",
    "url": "https://discordapp.com",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": "Number of choice, checkpoint and Main girls",
      "value": "Main girls: Enju and Akari.\nNumber of choice: 30.\nNumber of checkpoint: 9"
    }
  ]
};
    //send the embed in the channel where the command was made, then we had the reaction
    message.channel.send({ embed }).then(function (message){
      message.react("⬅️") //To look the previous embed, or the last one if used on the main page
      message.react("➡️") //To look the previous embed, or the first one if used on the last embed
      message.react("🗑️") //To deleted the embed
    }).catch(error =>console.error('Failed to add reaction: ', error));
  }

  //Just a test to show how should look a chapter
  else if (command === "season1") {
    const embed = {
  "title": "Moe! Ninja Girls season 1 Chapter 1 ",
  "description": "Here are the information about the Chapter 1 of season 1",
  "color": 14615963,
  "footer": {
    "text": "Moe Ninja Girls Season 1 Chapter 1"
  },
  "image": {
    "url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "author": {
    "name": "author name",
    "url": "https://discordapp.com",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": "Part 2",
      "value": "The girl on the bike. ❤️ *Closer to Akari*\nThe girl next to me. 💚 *Closer to Enju*\nWhich one should I choose ? *okay choice*"
    },
    {
      "name": "Part 5",
      "value": "I should ask Enju when I don’t understand something. 💚 *Closer to Enju*\nI wonder what Akari’s writing about… ❤️ *Closer to Akari*\nNo, I should think about this for myself. *okay choice*"
    },
    {
      "name": "Part 7",
      "value": "Dodge to the side! ❤️ *Closer to Akari*\nPut my hands out in front…! 💚 *Closer to Enju*\nOnward to paradise! *okay choice*"
    }
  ]
};
    message.channel.send({ embed }).then(function (message){
      message.react("⬅️")
      message.react("➡️")
      message.react("🗑️")
    }).catch(error =>console.error('Failed to add reaction: ', error));;
  }
})

client.login(config.token);
