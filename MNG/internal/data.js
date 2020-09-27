module.exports = {
    name: 'data',
    description: 'Module for data manupilation',
    // Fill the leftside of 1-digit numbers with a zero
    zerofill(_number) {
        // Convert it to a string
        _number = _number + "";
        return _number.padStart(2, "0");
    },
};
