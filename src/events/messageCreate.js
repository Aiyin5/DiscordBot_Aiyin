const { Interaction } = require("discord.js");
const seeDaoAi=require('./interface/seedaoAi');
function isQuestion(content) {
    if(content.includes('?') || content.includes('？')){
        return true;
    }
    else if(content.includes('什么') ||content.includes('如何') ||
        content.includes('怎么') || content.includes('哪些')){
        return true;
    }
    else{
        return false;
    }
}

function queueMap(content){
    //confirm fist

}

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        console.log(message);
        //如果消息的发起者是机器人，就不理会
        let author=message.author;
        if(author.id.includes('1075663991554191370')){
            return;
        }
        let content=message.content.toLowerCase();
        if(content.includes('<@1075663991554191370>')){
            await message.reply(`谢谢@我: ${message.author.username}`);
            if(content.includes("链接")){
                for (let i of client.nounwordsmap.keys()) {
                    if(content.includes(i)){
                        await message.reply(client.nounwordsmap.get(i));
                        break;
                    }
                }
            }
        }
        content = content.replace(/\s*/g,"");
        if(!isQuestion(content)){
            return;
        }
        if(content.includes("什么")||content.includes("链接")){
            for (let i of client.nounwordsmap.keys()) {
                if(content.includes(i)){
                    await message.reply(client.nounwordsmap.get(i));
                    break;
                }
            }
        }
        else if(content.includes("如何")||content.includes("怎么")){

        }
        else {
            await seeDaoAi(message,content);
        }
    },
};