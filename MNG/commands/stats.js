/**
 * Statistics image module
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

class Stats {
    get name() {
        return "stats";
    }
    get description() {
        return "Stats image module";
    }

    constructor() {
        this._data = require("../internal/data");
    }

    execute(_msg, _commandline, BOT) {
        // Who is it?
        let _heroine = this._data.getSubCommand(_commandline);

        // Grab the image to show
        let _image = this._data.getImageData(_heroine, "stats");
        if (_image) {
            BOT.internal.get("view").respond("simpleImage", {image: _image}, _msg, BOT);
        }
    }
}

module.exports = new Stats();