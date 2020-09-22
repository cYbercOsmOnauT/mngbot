module.exports = {
    name: 'filesystem',
    description: 'Filesystem calls',
    execute(msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};