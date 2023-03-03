const { Interaction } = require("discord.js");
const seeDaoAi=require('./interface/seedaoAi');
const preDataMap = require("../../data/perception.json");
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
        }
        content = content.replace(/\s*/g,"");
        if(!isQuestion(content)){
            return;
        }
        //前置判断
        let findFlag=false;
        for(let one of client.preData){
            let ans=true;
            let prompts=one.prompt;
            if(!Array.isArray(prompts)){
                continue;
            }
            for(let each of prompts){
                if(!content.includes(each)){
                    ans=false;
                }
            }
            if(ans){
                findFlag=true;
                await message.reply(one.completion);
                break;
            }
        }
        //非标判断,没有找到答案
        if (!findFlag){
            await seeDaoAi(message,content);
        }
    },
};