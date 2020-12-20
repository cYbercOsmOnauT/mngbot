module.exports = {
    name: 'choices',
    description: 'Show the choices of a specific part!',
    execute(_msg, _commandline) {
        let _image = BOT.internal.get("choices").getChoicesImage(_commandline);
        if (!_image) {
            // No choices image found
            throw new Error("No such choice");
        }
    },
};