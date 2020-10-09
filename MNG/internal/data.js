module.exports = {
    name: 'data',
    description: 'Module for data manupilation',
    // Fill the leftside of 1-digit numbers with a zero
    zerofill(_number) {
        // Convert it to a string
        _number = _number + "";
        return _number.padStart(2, "0");
    },
    /**
     * Return bool to show if the bot was triggered
     * @param _line (Commandline)
     * @returns {boolean}
     */
    isBotTriggered(_line) {
        const PREFIX = process.env.PREFIX;
        return (PREFIX + " " !== msg.content.substr(0, PREFIX.length + 1));
    },
    /**
     * Splits the commandline into parts and put's everything into an object
     * @param _line
     * @returns {object}
     */
    parseCommandline(_line) {
        const _parts = _line.split(/ +/);
        // The object where we will fill in our commandline
        const _commandline = {};
        // We don't need the trigger
        _parts.shift();

        // First part needs to be the command
        // We check if the command is known
        const _command = _parts.shift();
        if (!Bot.commands.has(_command)) {
            // Unknown command
            return {"error": "Unknown command **" + _command + "**"};
        }

        // Command known so let's fill the object
        _commandline.command = _command;

        // Let's go through the parts
        while (_parts.length) {
            // Grab the next part
            let _slice = _parts.shift();

            // We parse through all possible arguments
            if ("-season" === _slice || /^S/i.exec(_slice)) {
                // Season argument found
                // Was season already set?
                if ("undefined" !== typeof _commandline.season) {
                    return {"error": "Set Season several times"};
                }
                // All fine let's grab the season number
                let _season = 0;
                if ("-season" === _slice) {
                    _season = _parts.shift();
                }
                else {
                    // Short form was used. Just cut off the S at the start
                    _season = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+(\.5)?$/.exec(_season)) {
                    return {"error": "Mistyped season number"};
                }
            }
        }
    }
};
