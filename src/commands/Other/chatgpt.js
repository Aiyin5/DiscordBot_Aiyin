const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const {
    OpenAIApi,
    Configuration
} = require("openai");
const { chatApiKey } = require('../../../config.json');
const configuration = new Configuration({
    apiKey: chatApiKey
});

const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('seedao')
        .setDescription('Chat with seeDaoAi')
        .addStringOption(option => option.setName('message').setDescription('The message to send to seeDaoAi').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const message = interaction.options.getString('message');
        const tryMessage=message+' ->';
        /*               top_p: 1,
                       presence_penalty: 0.5,
                       frequency_penalty: 0.5,
                       best_of: 1,
                       n: 1,*/
        /*                stream: false,*/
        try {
            const response = await openai.createCompletion({
                model: "babbage:ft-personal-2023-02-23-08-00-53",
                prompt: tryMessage,
                max_tokens: 512,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                temperature: 0,
                stop:'END',
            })
            const embed = new EmbedBuilder()
                .setColor(2895667)
                .setTimestamp()
                .setAuthor({ name: 'seeDaoAi'})
                .setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``)
            await interaction.reply('问题：'+message);
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


