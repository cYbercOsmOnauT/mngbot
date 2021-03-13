/**
 * Storage Module to load/save variables persistent
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

class Storage {
    get name() {
        return "storage";
    }

    get description() {
        return "Module to load/save variables persistent";
    }

    constructor() {
        this.storage = require("node-persist");
        // Initialize the storage
        this.storage.init({
            dir: '../variables/',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
            expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
            // in some cases, you (or some other service) might add non-valid storage files to your
            // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
            forgiveParseErrors: false
        });
    }

    /**
     * Return the value of a saved variable
     * @param _varName
     * @returns {*}
     */
    async getVar(_varName) {
        return await this.storage.getItem(_varName);
    }

    /**
     * Sets a variable with a value
     * @param _varName
     * @param _varValue
     */
    async setVar(_varName, _varValue) {
        this.storage.setItem(_varName, _varValue);
    }

    /**
     * Deletes a variable
     * @param _varName
     */
    async delVar(_varName) {
        this.storage.removeItem(_varName);
    }
}

module.exports = new Storage();