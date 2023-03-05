const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const openai = require('../../util/chatBot')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgpt')
        .setDescription('Chat with chatGpt3.5')
        .addStringOption(option => option.setName('message').setDescription('The message to send to seeDaoAi').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const message = interaction.options.getString('message');
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: message}],
            });
            const embed = new EmbedBuilder()
                .setColor(2895667)
                .setTimestamp()
                .setTitle(message)
                .setDescription(`\`\`\`${response.data.choices[0].message}\`\`\``);
            await interaction.editReply({
                embeds: [embed]
            });
        } catch (error) {
            console.log(error)
            return await interaction.editReply({
                content: 'An error occurred while trying to send the message to seeDaoAi',
                ephemeral: true
            });
        }


    }
}


