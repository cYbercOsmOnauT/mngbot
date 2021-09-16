/**
 * Bot Class for Discord interaction
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
 * @version 1.4.1
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
require("dotenv").config();
const {DiscordInteractions} = require("slash-commands");

class BOT {
    /**
     * The constants we need
     * @returns {string}
     */
    get name() {
        return "bot";
    }
    get description() {
        return "Discord class!";
    }

    constructor() {
        this._token = process.env.TOKEN;
        this._interaction = new DiscordInteractions({
            applicationId: "1234567890",
            authToken: this._token,
            publicKey: process.env.PUBKEY,
        });
    }
    /**
     * Login and initialize our bot
     * @param _BOT Bot object from the main js
     */
    init(_BOT) {
        // First of all save the BOT object
        this._BOT = _BOT;

        // Now let's log in
        this._BOT.login(this._token);
        this._BOT.on("ready", () => {
            console.info(`Logged in as ${this._BOT.user.tag}!`);
        });

        // Initiate the message listener
        this.messageListener();
    }

    async messageListener() {
        this._BOT.on("messageCreate", async _msg => {
            // Does the message start with our prefix and also not from a Bot?
            if (!this._BOT.internal.get("data").isBotTriggered(_msg)) {
                // No, so do nothing
                return;
            }

            const _commandline = this._BOT.internal.get("data").parseCommandline(this._BOT, _msg.content);

            if ("undefined" !== typeof _commandline.error) {
                // There was an error
                // Send error message to view
                console.log("Error: " + _commandline.error);
                return;
            }

            // Get  the actual command
            const command = _commandline.command.toLowerCase();
            try {
                await this._BOT.commands.get(command).execute(_msg, _commandline, this._BOT);
            } catch (error) {
                console.error(error);
                _msg.reply("Hmm, I got an error.\n"+error);
            }
        });
    }
}

module.exports = new BOT();