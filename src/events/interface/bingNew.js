const {
    EmbedBuilder
} = require('discord.js');
const instance = require('../../util/caInstance')

module.exports =async (chatBot,message,content)=> {
    if(instance.getBusyType()){
        return await message.reply("机器人正在努力回答上一个问题，请稍后再试");
    }
    try {
        let outcontent="请搜索关于seedao的内容，并回答这个问题："
        let sendContent=outcontent+content;
        instance.setBusyType(true);
        chatBot.askAsync(sendContent)
            .then(async (response) => {
                console.log(response);
                let str=response.toString();
                if(response.includes("搜索结果，")){
                    let ans=str.split("搜索结果，");
                    let resStr=ans[1];
                    resStr=resStr.replace(/\[.*?\]/g, '' );

                    await message.reply(resStr);
                }
                else {
                    await message.reply("关于您的问题，我没有找到直接的答案。SeeDAO有一个Twitter账号@see_dao，和官网https://seedao.xyz/。您可以在那里与其他成员交流和讨论您的问题。");
                }
                instance.setBusyType(false);
            })
            .catch(error => {
                instance.setBusyType(false);
                console.error(error);
            });
    } catch (error) {
        console.log(error)
        instance.setBusyType(false);
        return await message.reply({
            content: 'An error occurred while trying to send the message to Bing_Api',
            ephemeral: true
        });
    }
}
