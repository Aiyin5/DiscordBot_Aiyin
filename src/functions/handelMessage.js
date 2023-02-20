const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = (client) => {
    client.handleMessage = async () => {
        client.on('interactionCreate', async interaction => {
            console.log(interaction);
            if(interaction.content=='p'){
                await interaction.reply({content:'q'});
            }
        });
    }
}