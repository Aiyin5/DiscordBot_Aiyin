const instance = require("../util/caInstance");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');
        try {
            await client.user.setPresence({activities: [{name: 'test@command'}], status: 'idle'});
            await client.user.setUsername(instance.getBotInfo().name);
            //await client.user.setAvatar('../output.jpg');
        } catch (error) {
            console.error(error);
        }
    },
};