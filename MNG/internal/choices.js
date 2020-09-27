module.exports = {
    name: 'choicess',
    description: 'Calls to find choices',
    getChoicesImages(_season, _chapter, _part) {

    },
    search(searchstring) {
        // First of all get the choices dir
        let _choicesDir = BOT.internal.get("fs").getChoicesDir();
    },
    execute(msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};