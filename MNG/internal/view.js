/**
 * Output Module
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

class View {
    get name() {
        return "view";
    }
    get description() {
        return "Bot respond module";
    }
    constructor() {
        this._mustache = require("mustache");
        this._fs = require("./fs");
        this._data = require("./data");
        this._system = require("./system");
    }

    /**
     * Returns templates for bot responses
     * @param _name {string} Name of the template
     * @returns {string|object} The requested template
     */
    getTemplate(_name) {
        if ("error" === _name) {
            // Errors are hardcoded to be sure they are shown.
            return {"type": "text", "content": "**ERROR:** {{message}}"};
        }
        return this._fs.getTemplate(_name);
    }

    /**
     * Return a parsed template
     * @param _tplName {string} Name of the template
     * @param _tplVars {object} Object with string data that is used inside the template.
     */
    parseTemplate(_tplName, _tplVars = {}) {
        // First let's get the template
        let _template = this.getTemplate(_tplName);
        if (!_template) {
            // Unknown Template
            return false;
        }
        // Now let's use the Object data for the replacements
        if ("text" === _template.type) {
            // Simple text template
            _template.content = this._mustache.render(_template.content, _tplVars);
        }
        else {

            // Embed
            let _str = this._data.objToString(_template.content);
            // Set the color and version for all embeds here
            _tplVars.color = this._system.getEmbedColor();
            _tplVars.version = this._system.getVersion();

            let _regex = new RegExp('§§(.*?)§§', "g");
            let _content = this._mustache.render(_str.replace(_regex, "{{$1}}"), _tplVars);
            let _tplObj = this._data.stringToObj(_content);

            // Need to change the color to integer
            _tplObj.color = parseInt(_tplObj.color);

            _template.content = _tplObj;
        }
        return _template;
    }

    respond(_tplName, _responseData, _message, _BOT, _reply = false) {
        let  _parsed = this.parseTemplate(_tplName, _responseData);
        let _response = _parsed.content;

        // Is it an Embed?
        if ("embed" === _parsed.type) {
            _response = {
                embeds: [_response]
            }
        }
        else {
            _response = {
                content: _response
            }
        }

        // Is it a reply?
        if (_reply) {
            _message.reply(_response);
        }
        else {
            _message.channel.send(_response);
        }
    }
}

module.exports = new View();
