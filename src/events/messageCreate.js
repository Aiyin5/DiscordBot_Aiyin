const seeDaoAi=require('./interface/seedaoAi')
const bingNew=require('./interface/bingNew');
const instance = require("../util/caInstance");
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
        let preData = instance.getArray();
        for(let one of preData){
            let ans=true;
            let prompts=one.prompt;
            if(prompts===undefined){
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
            let unPre = instance.getUnPreArray();
            let fg=false;
            for(let item of unPre){
                if(content.includes(item.keywords)){
                    await seeDaoAi(message,content,item.content);
                    fg=true;
                    break;
                }
            }
            //await bingNew(chatBot,message,content);
            if(!fg){
                await message.reply("不好意思，这个问题我暂时还没有办法回答");
            }
        }
    },
};