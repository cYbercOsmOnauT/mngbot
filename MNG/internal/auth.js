const FS = require("./fs");
const ADMIN = 2;
const MOD = 1;
const NORM = 0;

module.exports = {
    name: 'auth',
    description: 'Authentication module',
    owner: '266898040260919297',
    /**
     *
     * @param _id Userid
     * @returns {number} Access level
     */
    getAuth(_id) {
        if (this.owner === _id) {
            return ADMIN;
        }
    },
    isAdmin(_user) {
        return ADMIN === this.getAuth(_user.id);
    }
}