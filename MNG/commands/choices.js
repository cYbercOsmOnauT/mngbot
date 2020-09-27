module.exports = {
    name: 'choices',
    description: 'Show the choices of a specific part!',
    execute(_msg, _args) {
        let _image = BOT.internal.get("choices").getChoicesImage(_args[0], _args[1], _args[2]);
    },
};