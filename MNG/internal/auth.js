const FS = require("./fs");
const ADMIN = 2;
const MOD = 1;
const NORM = 0;

module.exports = {
    name: 'auth',
    description: 'Authentication module',
    owner: 'x5c0d3#1085',
    /**
     *
     * @param _user Userid
     * @returns {number} Access level
     */
    getAuth(_user) {
        if (this.owner === _user) {
            return ADMIN;
        }
    },
    isAdmin(_user) {
        return ADMIN === this.getAuth(_user);
    }
}