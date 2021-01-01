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
        return (PREFIX + " " === _line.substr(0, PREFIX.length + 1));
    },
    /**
     * Splits the commandline into parts and put's everything into an object
     * @param BOT
     * @param _line
     * @returns {object}
     */
    parseCommandline(BOT, _line) {
        // RegEx splitter code taken from regex101.com and adjusted
        const _regex = new RegExp("\".*?\"|\\S+", "g");
        const _parts = [];
        let _hit;

        while ((_hit = _regex.exec(_line)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (_hit.index === _regex.lastIndex) {
                _regex.lastIndex++;
                continue;
            }
            // First of all let's get  rid of the " at the left and right (if it's surrounded by quotes)
            if (/^".*"$/.test(_hit[0])) {
                // Cut the quotes from the edges out
                _hit[0] = _hit[0].substring(1, _hit[0].length - 1);
            }
            // Trim the whitespace left and right
            _hit[0] = _hit[0].trim();

            // Is there anything left in the string?
            if (!_hit[0].length) {
                // No
                continue;
            }
            // Push it into our commandline parts
            _parts.push(_hit[0]);
        }

        // The object where we will fill in our commandline
        const _commandline = {};
        // We don't need the trigger
        _parts.shift();

        // First part needs to be the command
        // We check if the command is known
        const _command = _parts.shift();
        if (!BOT.commands.has(_command)) {
            // Unknown command
            return {"error": "Unknown command **" + _command + "**"};
        }

        // Command known so let's fill the object
        _commandline.command = _command;

        // for all slices
        _commandline.slices = [];

        // Let's go through the parts
        while (_parts.length) {
            // Grab the next part
            let _slice = _parts.shift();

            // Empty slice? (The last can be one)
            if (!_slice.length) {
                continue;
            }

            // Arguments can start with - or -- plus letters
            if (/^--?[a-z]+$/i.test(_slice)) {
                // Let's get rid of the - at the start
                while ("-" === _slice.substr(0, 1)) {
                    _slice = _slice.substr(1);
                }
                let _argumentName = _slice;
                _commandline[_argumentName] = _parts.shift();
            }

            // We parse through all possible arguments
            if ("season" === _slice || /^S\d+/i.exec(_slice)) {
                // Season argument found
                // Was season already set?
                if ("undefined" !== typeof _commandline.season) {
                    return {"error": "Set Season several times"};
                }
                // All fine let's grab the season number
                let _season = 0;
                if ("season" === _slice) {
                    _season = _parts.shift();
                } else {
                    // Short form was used. Just cut off the S at the start
                    _season = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+(\.5)?$/.test(_season)) {
                    return {"error": "Mistyped Season number"};
                }
                _commandline.season = _season;
                _commandline.slices.push("season", _season);
            } else if ("chapter" === _slice || /^C\d+/i.exec(_slice)) {
                // Chapter argument found
                // Was chapter already set?
                if ("undefined" !== typeof _commandline.chapter) {
                    return {"error": "Set Chapter several times"};
                }
                // All fine let's grab the Chapter number
                let _chapter = 0;
                if ("chapter" === _slice) {
                    _chapter = _parts.shift();
                } else {
                    // Short form was used. Just cut off the S at the start
                    _chapter = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+$/.test(_chapter)) {
                    return {"error": "Mistyped Chapter number"};
                }
                _commandline.chapter = _chapter;
                _commandline.slices.push("chapter", _chapter);
            } else if ("part" === _slice || /^P\d+/i.exec(_slice)) {
                // Part argument found
                // Was part already set?
                if ("undefined" !== typeof _commandline.part) {
                    return {"error": "Set Part several times"};
                }
                // All fine let's grab the part number
                let _part = 0;
                if ("part" === _slice) {
                    _part = _parts.shift();
                } else {
                    // Short form was used. Just cut off the S at the start
                    _part = _slice.substr(1);
                }
                // Only digits are allowed as season (or with a .5 at the end)
                if (!/\d+$/.test(_part)) {
                    return {"error": "Mistyped Part number"};
                }
                _commandline.part = _part;
                _commandline.slices.push("part", _part);
            } else {
                // Nothing that we recognize
                _commandline.slices.push(_slice);
            }
        }
        // Return the object of arguments
        return _commandline;
    }
};
