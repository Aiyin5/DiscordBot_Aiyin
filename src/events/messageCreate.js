const seeDaoAi=require('./interface/seedaoAi')
const bingNew=require('./interface/bingNew');
const instance = require("../util/caInstance");
function isQuestion(content) {
    if(content.includes('?') || content.includes('？') || content.includes('吗')){
        return true;
    }
    else if(content.includes('什么') ||content.includes('如何') ||
        content.includes('怎么') || content.includes('哪些') ||
        content.includes('怎样') || content.includes('哪里')||content.includes('多少')){
        return true;
    }
    else{
        return false;
    }
}
module.exports = {
    name: 'messageCreate',
    async execute(message, client,chatBot) {
        //如果消息的发起者是机器人，就不理会
        let author=message.author;
        if(author.id.includes('1075663991554191370')){
            return;
        }
        let content=message.content.toLowerCase();
        if(content.includes('<@1075663991554191370>')){
            await message.reply(`
                    谢谢@我: ${message.author.username}
            我有以下的这些功能
            1.可以问我关于seeDao的问题
            2.可以用'/获取头像'加上描述获取一张头像
            3.可以用'/newgpt'跟chatGpt对话
            4.可以找我领取任务和查询任务信息（暂未上线）
            5.其他功能在更新中、、、`);
        }
        if(content.includes('<@') && !content.includes('<@1075663991554191370>')){
            //不是@机器人的消息返回
            return;
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
                await bingNew(chatBot,message,content);
                //await message.reply("不好意思，这个问题超纲了（seedao notion里没有提及，可以去“有问有答”频道问一问在线的小伙伴呢～）");
            }
        }
    },
};