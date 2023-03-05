const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const openai = require('../../util/chatBot')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seedao')
        .setDescription('Chat with seeDaoAi')
        .addStringOption(option => option.setName('message').setDescription('The message to send to seeDaoAi').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const message = interaction.options.getString('message');
        const tryMessage=message+' ->';
        try {
            const response = await openai.createCompletion({
                model: "babbage:ft-personal-2023-02-23-09-52-44",
                prompt: tryMessage,
                max_tokens: 512,
                frequency_penalty: 0,
                presence_penalty: 0,
                temperature: 0,
                stop:'END',
            })
            const embed = new EmbedBuilder()
                .setColor(2895667)
                .setTimestamp()
                .setTitle(message)
                .setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``);
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


