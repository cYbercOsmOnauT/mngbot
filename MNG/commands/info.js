/**
 * Info command Module
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

class Info {
    get name() {
        return "info";
    }

    get description() {
        return "Info command";
    }

    constructor() {
        this._system = require("../internal/system");
        this._data = require("../internal/data");
    }

    execute(_msg, _commandline, _BOT) {
        // First of all let's check the access level
        if (!_BOT.internal.get("auth").isAdmin(_msg.author)) {
            return false;
        }

        let _latency = this._system.getLatency(_msg);
        let _ping = this._system.getPing(_BOT);
        let _uptime = this._system.getUptime(_BOT);
        _BOT.internal.get("view").respond("info", {
            latency: _latency,
            ping: _ping,
            uptime: _uptime
        }, _msg, _BOT);
    }
}

module.exports = new Info();