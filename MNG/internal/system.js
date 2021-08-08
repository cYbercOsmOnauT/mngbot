/**
 * System Module
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
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

class System {
    get name() {
        return "system";
    }
    get description() {
        return "Class for system calls";
    }

    constructor() {
        this._data = require("../internal/data");
        let { exec, spawn } = require("child_process");
        this._exec = exec;
        this._spawn = spawn;
    }
    /**
     * Restarting the bot
     */
    restart (_msg, _BOT) {
        // Say something
        _BOT.internal.get("view").respond("response", {message: "Hai onii-chan! _Restarting main system..._"}, _msg, _BOT);
        setTimeout(function () {
            this._exec("/usr/bin/systemctl restart saibot.service");
        }, 1000);
    }

    /**
     * Shutting down
     */
    shutdown(_msg, _BOT) {
        // Say something
        _BOT.internal.get("view").respond("response", {message: "_Shutting down..._ Oyasuminasai Onii-chan!"}, _msg, _BOT);
        setTimeout(function() {
            this._exec("/usr/bin/systemctl stop saibot.service");
        }, 1000);
    }

    /**
     * Get the ping time in ms
     * @param _BOT
     * @returns {number} ping in ms
     */
    getPing(_BOT) {
        return Math.round(_BOT.ping);
    }

    /**
     * Get the ping in ms
     * @param _BOT
     * @returns {object} uptime in ms
     */
    getUptime(_BOT) {
        return this._data.parseTime(_BOT.uptime);
    }

    /**
     * Get the latency in ms
     * @param _msg
     * @returns {number} latency in ms
     */
    getLatency(_msg) {
        return Date.now() - _msg.createdTimestamp;
    }

    /**
     * Responds with the version of the bot
     *
     * @returns {string} Version number
     */
    getVersion() {
        return "v1.4.0";
    }

    /**
     * Responds with the color code for the embed
     *
     * @returns {number} Embed color
     */
    getEmbedColor() {
        return 13800513; // Hex D29441
    }
}

module.exports = new System();