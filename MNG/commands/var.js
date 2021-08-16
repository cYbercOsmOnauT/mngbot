/**
 * Variables Module
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

class Var {
    get name() {
        return "var";
    }
    get description() {
        return "Work with internal variables!";
    }

    constructor() {
        this._data = require("../internal/data");
        this._storage = require("../internal/storage");
    }

    async execute(_msg, _commandline, BOT) {
        // First of all let's check the access level
        if (!BOT.internal.get("auth").isAdmin(_msg.author)) {
            BOT.internal.get("view").respond("error", {message: "Access denied"}, _msg, BOT);
            return;
        }
        let _subcommand = this._data.getSubCommand(_commandline);
        let _varname = this._data.getSubCommand(_commandline, 1);
        let _message = "";
        let _value;

        switch (_subcommand) {
            case 'get':
                _value = await this._storage.getVar(_varname);
                if ("undefined" === typeof _value) {
                    _message = "The variable **" + _varname + "** is unset!";
                }
                else {
                    _message = "The value of **" + _varname + "** is: **" + _value + "**";
                }
                break;
            case 'set':
                _value = this._data.getSubCommand(_commandline, 2);
                this._storage.setVar(_varname, _value);
                _message = "Variable **" + _varname + "** set to: **" + _value + "**";
                break;
            case 'delete':
            case 'purge':
            case 'remove':
                this._storage.delVar(_varname);
                _message = "Variable **" + _varname + "** deleted.";
        }

        BOT.internal.get("view").respond("response", {message: _message}, _msg, BOT);
    }
}

module.exports = new Var();