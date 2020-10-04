/**
 * MNG Bot that works with modular methods
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee
 * @author Nicolas Guyomarch aka Lord Grim
 * @version 1.0.0
 * @since Sep. 2020
 * @licence GNU GPL v3.0
 *
 * Copyright (C) 2020  Tekin Birdüzen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Set the requirements and constants
require("dotenv").config();
FS = require("fs");
PATH = require("path");
const DISCORD = require("discord.js");
const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;

BOT = new DISCORD.Client();
BOT.commands = new DISCORD.Collection();
BOT.internal = new DISCORD.Collection();
const BOTCOMMANDS = require("./commands");
const INTERNAL = require("./internal");

// Load bot commands
Object.keys(BOTCOMMANDS).map(key => {
  BOT.commands.set(BOTCOMMANDS[key].name, BOTCOMMANDS[key]);
});
BOT.login(TOKEN);
// Load internal methods
Object.keys(INTERNAL).map(key => {
  BOT.internal.set(INTERNAL[key].name, INTERNAL[key]);
});

BOT.on("ready", () => {
  console.info(`Logged in as ${BOT.user.tag}!`);
});

BOT.on("message", msg => {
  // Does the message start with our prefix?
  if (PREFIX !== msg.content.substr(0, PREFIX.length)) {
    // No, so do nothing
    return;
  }
  const args = msg.content.split(/ +/);
  // Remove the Prefix (like !mng)
  args.shift();
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!BOT.commands.has(command)) {
    // Unknown command
    return;
  }

  try {
    BOT.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("Hmm, I got an error. I am sorry!");
  }
});
