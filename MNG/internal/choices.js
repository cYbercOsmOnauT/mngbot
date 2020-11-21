module.exports = {
    name: 'choices',
    description: 'Calls to find choices',
    getChoicesImages(_season, _chapter, _part) {
        let _image = BOT.internal.get("fs").getChoicesImage(_season, _chapter, _part);
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