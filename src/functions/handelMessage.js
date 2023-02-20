module.exports = (client) => {
    client.handleMessage = async () => {
        client.on('messageCreate', message => {
            if (message.content === 'ping')
            { message.channel.send('Pong!');
            };
        }
        )
}