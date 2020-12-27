const PATH = require("path");
const FS = require("fs");
module.exports = {
    name: 'filesystem',
    description: 'Filesystem calls',
    write(_path, _data) {
        // Security
        if (0 === _path.indexOf('/') || -1 !== _path.indexOf('..')) {
            return false;
        }
        FS.writeFile(_path, _data);
    },
    getChoicesDir() {
        return PATH.resolve("../choices");
    },
    getCacheDir() {
        return PATH.resolve("../cache");
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
    }
};