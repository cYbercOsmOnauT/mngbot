/**
 * MNG Bot that works with modular methods
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee
 * @author Nicolas Guyomarch aka Lord Grim
 * @version 1.4.0
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
"use strict";

// Set the requirements and constants
global.SCHEDULE = require("node-schedule");
const { Client, Intents, Collection } = require('discord.js');
const BOT = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

BOT.commands = new Collection();
BOT.internal = new Collection();
const BOTCOMMANDS = require("./commands");
const INTERNAL = require("./internal");

// Load bot commands
Object.keys(BOTCOMMANDS).map(_key => {
  BOT.commands.set(BOTCOMMANDS[_key].name, BOTCOMMANDS[_key]);
});
// Load internal methods
Object.keys(INTERNAL).map(_key => {
  BOT.internal.set(INTERNAL[_key].name, INTERNAL[_key]);
});

// Bot class takes over from here
BOT.internal.get("bot").init(BOT);
