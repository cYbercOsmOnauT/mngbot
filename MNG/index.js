require('dotenv').config();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
BOT.commands = new DISCORD.Collection();
const BOTCOMMANDS = require('./commands');

Object.keys(BOTCOMMANDS).map(key => {
  BOT.commands.set(BOTCOMMANDS[key].name, BOTCOMMANDS[key]);
});
BOT.login(TOKEN);

BOT.on('ready', () => {
  console.info(`Logged in as ${BOT.user.tag}!`);
});

BOT.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!BOT.commands.has(command)) return;

  try {
    BOT.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('Hmm, I got an error. I am sorry!');
  }
});
