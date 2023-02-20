module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' });
            } catch (error) {
                console.error(error);
            }
        }
    },
};