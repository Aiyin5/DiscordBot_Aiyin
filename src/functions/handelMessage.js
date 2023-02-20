const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = (client) => {
    client.handleMessage = async () => {
        client.on('messageCreate', async message => {
            console.log(message);
            if(message.content=='p'){
                await message.reply({content:'q'});
            }
        });
    }
}