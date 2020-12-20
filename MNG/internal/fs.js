module.exports = {
    name: 'filesystem',
    description: 'Filesystem calls',
    choicesDir: PATH.resolve("../choices"),
    getChoicesDir() {
        return this.choicesDir;
    },
    getChoiceFile(_season, _chapter = 0, _part = 0) {
        let _searchstring = this.createChoiceFilename(_season, _chapter, _part);
        let _file = FS.readdirSync(this.getChoicesDir()).filter(function (_filename) {
            return 0 === _filename.indexOf(_searchstring);
        });
        console.log(_file);
    },
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
    },
    execute(msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};