const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = (client) => {
    client.handleMessage = async () => {
        client.on(Events.MessageCreate, async message => {
            console.log(message);
            if(message.content=='p'){
                await message.reply({content:'q'});
            }
        });
    }
}