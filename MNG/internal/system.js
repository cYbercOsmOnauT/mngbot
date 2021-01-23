/**
 * System Module
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
 * @version 1.1.0
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

    /**
     * Restarting the bot
     */
    restart () {
        setTimeout(function () {
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                });
            });
            process.exit();
        }, 1000);
    }

    /**
     * Shutting down
     */
    shutdown() {
        setTimeout(function() {
            process.exit(1);
        }, 1000);
    }

    /**
     * Responds with the version of the bot
     *
     * @returns {string} Version number
     */
    getVersion() {
        return "v1.1.0";
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