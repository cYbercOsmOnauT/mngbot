const AUTH = require("../internal/auth");

module.exports = {
    name: 'var',
    description: 'Work with internal variables!',
    execute(_msg, _commandline, BOT) {
        // First of all let's check the access level
        if (!BOT.internal.get("auth").isAdmin(_msg.author)) {
            console.log(_msg.author);
        }
        let _subcommand = _commandline.slices.push();
    },
};
