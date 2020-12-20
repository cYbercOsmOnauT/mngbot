module.exports = {
    name: 'choices',
    description: 'Calls to find choices',
    getChoicesImages(_commandline) {
        let _season = "undefined" === typeof _commandline.season ? 0 : _commandline.season;
        let _chapter = "undefined" === typeof _commandline.chapter ? 0 : _commandline.chapter;
        let _part = "undefined" === typeof _commandline.part ? 0 : _commandline.part;

        let _image = this.search(_season, _chapter, _part);
        if (!_image) {
            // nothing found
            return false;
        }
    },
    search(_season, _chapter, _part) {
        // Fill the 1 digit numbers with a 0
        let [_zSeason, _zChapter, _zPart] = [_season, _chapter, _part].map(function(_number) {
            return BOT.internal.get("data").zerofill(_number);
        });
        // Find the file
        let _file = BOT.internal.get("fs").getChoiceFile(_zSeason, _zChapter, _zPart);

    },
};