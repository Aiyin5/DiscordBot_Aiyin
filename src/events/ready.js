module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');
        try {
            await client.user.setPresence({activities: [{name: 'test@seeDaoAi'}], status: 'idle'});
        } catch (error) {
            console.error(error);
        }
    },
};