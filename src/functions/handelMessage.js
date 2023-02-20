const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = (client) => {
    client.handleMessage = async () => {
        client.on(Events.InteractionCreate, async interaction => {
            console.log(interaction);
            if(interaction.content=='p'){
                await interaction.reply({content:'q'});
            }
            if (!interaction.isChatInputCommand()) return;

            if (interaction.commandName === 'button') {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('primary')
                            .setLabel('Click me!')
                            .setStyle(ButtonStyle.Primary),
                    );

                await interaction.reply({ content: 'I think you should,', components: [row] });
            }
        });
    }
}