/**
 * Output Module
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
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

class View {
    get name() {
        return "view";
    }
    get decription() {
        return "Bot respond module";
    }
    constructor() {
        this._mustache = require("mustache");
        this._fs = require("./fs");
    }

    /**
     * Returns templates for bot responses
     * @param _name {string} Name of the template
     * @returns {string} The requested template
     */
    getTemplate(_name) {
        switch (_name) {
            case "error":
                return {"text": "**ERROR:** {{message}}"};
            default:
                return false;
        }
    }

    /**
     * Return a parsed template
     * @param _tplName {string} Name of the template
     * @param _args {object} Object with string data that is used inside the template.
     */
    parseTemplate(_tplName, _args = {}) {
        // First of all let's get the template
        let _template = this.getTemplate(_tplName);
        if (!_template) {
            // Unknown Template
            return false;
        }
        // Now let's use the Object data for the replacements
        Object.keys(_args).map(function(_key) {
            let _regEx = new RegExp("{{" + _key + "}}", "g");
            _template = _template.replace(_regEx, _args[_key]);
        });
        // Send back the result
        return _template;
    }
}

module.exports = new View();
