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
        .setName('chatgpt')
        .setDescription('Chat with GPT-3')
        .addStringOption(option => option.setName('message').setDescription('The message to send to GPT-3').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const message = interaction.options.getString('message');
        /*               top_p: 1,
                       presence_penalty: 0.5,
                       frequency_penalty: 0.5,
                       best_of: 1,
                       n: 1,*/
        /*                stream: false,*/
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 2048,
                temperature: 0.5,
            })

            const embed = new EmbedBuilder()
                .setColor(2895667)
                .setTimestamp()
                .setAuthor({ name: 'ChatGPT', iconURL: 'https://openai.com/content/images/2022/05/openai-avatar.png'})
                .setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``)
            await interaction.editReply({
                embeds: [embed]
            });
        } catch (error) {
            console.log(error)
            return await interaction.editReply({
                content: 'An error occurred while trying to send the message to GPT-3',
                ephemeral: true
            });
        }


    }
}


