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
                if (!/\d+(\.5)?$/.test(_season)) {
                    return {"error": "Mistyped Season number"};
                }
                _commandline.season = _season;
            }
            else if ("-chapter" === _slice || /^C/i.exec(_slice)) {
                // Chapter argument found
                // Was chapter already set?
                if ("undefined" !== typeof _commandline.chapter) {
                    return {"error": "Set Chapter several times"};
                }
                // All fine let's grab the Chapter number
                let _chapter = 0;
                if ("-season" === _slice) {
                    _chapter = _parts.shift();
                }
                else {
                    // Short form was used. Just cut off the S at the start
                    _chapter = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+$/.test(_chapter)) {
                    return {"error": "Mistyped Chapter number"};
                }
                _commandline.chapter = _chapter;
            }
            else if ("-part" === _slice || /^P/i.exec(_slice)) {
                // Part argument found
                // Was part already set?
                if ("undefined" !== typeof _commandline.part) {
                    return {"error": "Set Chapter several times"};
                }
                // All fine let's grab the part number
                let _part = 0;
                if ("-season" === _slice) {
                    _part = _parts.shift();
                }
                else {
                    // Short form was used. Just cut off the S at the start
                    _part = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+$/.test(_part)) {
                    return {"error": "Mistyped Part number"};
                }
                _commandline.part = _part;
            }
            else {
                // Nothing that we recognize
                return {"error": "Unknown argument"};
            }
        }
        // Return the object of arguments
        return _commandline;
    }
};
