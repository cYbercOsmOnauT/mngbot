/**
 * Authentication Module
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

const FS = require("./fs");

class Auth {
    // Constants
    static get ADMIN() {
        return 2;
    }
    static get MOD() {
        return 1;
    }
    static get NORM() {
        return 0;
    }
    static get name() {
        return "auth";
    }
    static get description() {
        return "Authentication module";
    }
    static get owner() {
        return "266898040260919297";
    }

    /**
     * Check the access authentication of a userid
     *
     * @param _id Userid
     * @returns {number} Access level
     */
    getAuth(_id) {
        if (Auth.owner === _id) {
            return Auth.ADMIN;
        }
    }

    /**
     * Check if userid is an admin
     *
     * @param _user
     * @returns {boolean} isAdmin
     */
    isAdmin(_user) {
        return Auth.ADMIN === this.getAuth(_user.id);
    }
}

module.exports = new Auth();