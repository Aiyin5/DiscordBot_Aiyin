const {
    EmbedBuilder
} = require('discord.js');
const openai = require('../../util/chatBot')

module.exports =async (message,content,otherMess)=> {
        const tryMessage="请根据一下内容回答这个问题："+content+"。/n"+otherMess;
        console.log(tryMessage);
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                temperature: 0,
                messages: [{role: "user", content: tryMessage}],
            });
            await message.reply("调用seedaoAi");
            await message.reply(response.data.choices[0].message.content);
        } catch (error) {
            console.log(error)
            return await message.reply({
                content: 'An error occurred while trying to send the message to seeDaoAi',
                ephemeral: true
            });
        }
}
