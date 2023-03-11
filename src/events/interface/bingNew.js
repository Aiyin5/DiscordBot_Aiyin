const {
    EmbedBuilder
} = require('discord.js');


module.exports =async (chatBot,message,content)=> {
    try {
        let outcontent="请搜索关于seedao的内容，并回答这个问题："
        let sendContent=outcontent+content;
        chatBot.askAsync(sendContent)
            .then(async (response) => {
                let str=response.toString();
                if(response.includes("搜索结果，")){
                    let ans=str.split("搜索结果，");
                    let resStr=ans[1];
                    resStr=resStr.replace(/\[.*?\]/g, '' );
                    await message.reply(resStr);
                }
                else {
                    await message.reply("不好意思，这个问题超纲了（seedao notion里没有提及，可以去“有问有答”频道问一问在线的小伙伴呢～）");
                }
                //await message.reply(response);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.log(error)
        return await message.reply({
            content: 'An error occurred while trying to send the message to seeDaoAi',
            ephemeral: true
        });
    }
}
