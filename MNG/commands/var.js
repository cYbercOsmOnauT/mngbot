/**
 * Variables Module
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
 * @version 1.2.1
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

    execute(_msg, _commandline, BOT) {
        // First of all let's check the access level
        if (!BOT.internal.get("auth").isAdmin(_msg.author)) {
            console.log(_msg.author);
        }
        let _subcommand = _commandline.slices.shift();
    }
}

module.exports = new Var();