module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');
        try {
            await client.user.setPresence({activities: [{name: 'ai_create'}], status: 'idle'});
        } catch (error) {
            console.error(error);
        }
    },
};