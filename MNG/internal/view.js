module.exports = {
    name: 'view',
    description: 'Bot respond methods',
    /**
     * Returns templates for bot responses
     * @param _name {string} Name of the template
     * @returns {string} The requested template
     */
    getTemplate(_name) {
        switch (_name) {
            case "error":
                return "**ERROR:** {{message}}";
            default:
                return false;
        }
    },
    /**
     * Return a parsed template
     * @param _tplName {string} Name of the template
     * @param _args {object} Object with string data that is used inside the template.
     */
    parseTemplate(_tplName, _args = {}) {
        // First of all let's get the template
        let _template = this.getTemplate(_tplName);
        if (!_template) {
            // Unknown Template
            return false;
        }
        // Now let's use the Object data for the replacements
        Object.keys(_args).map(function(_key) {
            let _regEx = new RegExp("{{" + _key + "}}", "g");
            _template = _template.replace(_regEx, _args[_key]);
        });
        // Send back the result
        return _template;
    }
};