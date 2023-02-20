module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');
        try {
            await client.user.setPresence({activities: [{name: 'activity'}], status: 'idle'});
        } catch (error) {
            console.error(error);
        }
    },
};