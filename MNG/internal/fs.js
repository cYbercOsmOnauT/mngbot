module.exports = {
    name: 'filesystem',
    description: 'Filesystem calls',
    choicesDir: PATH.resolve("../choices"),
    getChoicesDir() {
        return this.choicesDir;
    },
    execute(msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};