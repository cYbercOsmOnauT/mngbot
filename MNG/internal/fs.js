module.exports = {
    name: 'filesystem',
    description: 'Filesystem calls',
    choicesDir: PATH.resolve("../choices"),
    getChoicesDir() {
        return this.choicesDir;
    },
    getChoiceFile(_season, _chapter, _part) {
      let _file = FS.readdirSync(this.getChoicesDir()).filter(function(_filename) {
          return 0 === _filename.indexOf(_searchstring);
      })
    },
    /**
     * Method to passte together the filename
     * @param _season
     * @param _chapter
     * @param _part
     * @returns {string}
     */
    createChoiceFilename(_season, _chapter, _part) {
        return _season + "-" + _chapter + "+" + _part + ".png";
    },
    execute(msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};