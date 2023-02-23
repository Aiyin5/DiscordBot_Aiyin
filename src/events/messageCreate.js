const { Interaction } = require("discord.js");
const {data}=require('../../data/beforInterception.json');
const {nounwords}=require('../../data/noun_words.json');
const nounwordsMap=new Map(Object.entries(nounwords));
const datamap = new Map(Object.entries(data));

function isQuestion(content) {
    if(content.indexOf('?')!=-1 || content.indexOf('？')!=-1){
        return true;
    }
    else if(content.indexOf('什么')!=-1 ||content.indexOf('如何')!=-1 ||
        content.indexOf('怎么')!=-1 || content.indexOf('哪些')!=-1){
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
        if(author.id.indexOf('1075663991554191370')!=-1){
            return;
        }
        let content=message.content.toLowerCase();
        if(content.indexOf('<@1075663991554191370>')!=-1){
            //need to answer directly
            await message.reply(`谢谢@我: ${message.author.username}`);
        }
        content = content.replace(/\s*/g,"");
        if(!isQuestion(content)){
            return;
        }
        if(content.indexOf("什么")!=-1){
            let key = nounwordsMap.keys();
            for (let i in key) {
                if(content.indexOf("i")!=-1){
                    await message.reply({content:nounwordsMap.get(i)});
                    return;
                }
            }
        }
    },
};