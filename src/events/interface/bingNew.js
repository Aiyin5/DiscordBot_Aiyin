const {
    EmbedBuilder
} = require('discord.js');


module.exports =async (chatBot,message,content)=> {
    try {
        chatBot.askAsync(content)
            .then(async (response) => {
                await message.reply(response);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.log(error)
        return await message.reply({
            content: 'An error occurred while trying to send the message to seeDaoAi',
            ephemeral: true
        });
    }
}
