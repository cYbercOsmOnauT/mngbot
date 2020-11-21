module.exports = {
    name: 'choices',
    description: 'Show the choices of a specific part!',
    execute(_msg, _commandline) {
        let _image = BOT.internal.get("choices").getChoicesImage(_args[0], _args[1], _args[2]);
        if (!_image) {
            // No choices image found
            throw new Error("No such choice");
        }
    },
};