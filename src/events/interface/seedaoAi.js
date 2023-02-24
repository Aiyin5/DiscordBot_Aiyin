const {
    OpenAIApi,
    Configuration
} = require("openai");
const {
    EmbedBuilder
} = require('discord.js');
const { chatApiKey } = require('../../../config.json');
const configuration = new Configuration({
    apiKey: chatApiKey
});
const openai = new OpenAIApi(configuration);

module.exports =async (message,content)=> {
        const tryMessage=content+' ->';
        console.log(tryMessage);
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
/*            const embed = new EmbedBuilder()
                .setColor(2895667)
                .setTimestamp()
                .setTitle(content)
                .setDescription(`\`\`\`${response.data.choices[0].text}\`\`\``);*/
            /*await message.editReply({
                embeds: [embed]
            });*/
            console.log(message);
            const replydata=response.data.choices[0];
            await message.reply(replydata);
        } catch (error) {
            console.log(error)
            return await message.reply({
                content: 'An error occurred while trying to send the message to seeDaoAi',
                ephemeral: true
            });
        }
}
