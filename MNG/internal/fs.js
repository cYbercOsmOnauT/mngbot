/**
 * Filesystem Module
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

class Fs {
    get name() {
        return "filesystem";
    }
    get description() {
        return "Filesystem calls";
    }
    constructor() {
        this._PATH = require("path");
        this._FS = require("fs");
        this._ROOT = this._PATH.resolve(".") + "/";
    }

    /**
     * Checks if the path is absolut or has .. in it for security
     * @param _path
     * @returns {boolean}
     */
    checkPath(_path) {
        // Security
        let _absolutePath = this._PATH.resolve(_path);
        return 0 === _absolutePath.indexOf(this._ROOT);
    }

    write(_path, _data) {
        if (!this.checkPath(_path)) {
            return false;
        }
        this._FS.writeFileSync(_path, _data);
    }

    read(_path, _json = true) {
        if (!this.checkPath(_path)) {
            return false;
        }
        let _content = this._FS.readFileSync(_path).toString();
        if (_json) {
            // Saves us against circular dependencies
            if ("undefined" === typeof this._data) {
                this._data = require("./data");
            }
            _content = this._data.stringToObj(_content);
        }
        return _content;
    }

    /**
     * Checks if a given string is clean
     * @param _string
     * @returns {boolean}
     */
    securityCheck(_string) {
        return /^[a-zA-Z0-9-_]+$/.test(_string);
    }

    getTemplate(_tplName, _lang = "en") {
        // Security Check
        if (!this.securityCheck(_tplName)) {
            return false;
        }
        let _tplDir = this.getDir("templates", _lang);
        return this.read(_tplDir + _tplName + ".json");
    }

    getData(_filename) {
        // Security Check
        if (!this.securityCheck(_filename)) {
            return false;
        }
        let _dataDir = this.getDir("data");
        return this.read(_dataDir + _filename + ".json");
    }

    getDir(_dirname, _lang = "en") {
        switch (_dirname) {
            case "choices":
                return this._PATH.resolve("./choices") + "/";
            case "templates":
                return this._PATH.resolve("./templates/" + _lang) + "/";
            case "data":
                return this._PATH.resolve("./data") + "/";
            case "cache":
            default:
                return this._PATH.resolve("./cache") + "/";
        }
    }

    getChoiceFile(_season, _chapter = 0, _part = 0) {
        let _searchstring = this.createChoiceFilename(_season, _chapter, _part);
        let _file = FS.readdirSync(this.getDir("choices")).filter(function (_filename) {
            return 0 === _filename.indexOf(_searchstring);
        });
        console.log(_file);
    }
    /**
     * Method to paste together the filename
     * @param _season
     * @param _chapter
     * @param _part
     * @returns {string}
     */
    createChoiceFilename(_season, _chapter, _part) {
        _season = parseInt(_season);
        _chapter = parseInt(_chapter);
        _part = parseInt(_part);
        return "^" + _season + "-" + _chapter + "-" + _part + "\.png$";
    }
}
module.exports = new Fs();