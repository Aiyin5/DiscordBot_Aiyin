const { Interaction } = require("discord.js");
const{data}=require('../../beforInterception.json');
const map = new Map(Object.entries(data));

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
            await message.reply(`谢谢@我：: ${message.author.username}`);
        }
        content = content.replace(/\s*/g,"");
        if(!isQuestion(content)){
            return;
        }
        map.forEach( async (value, key) => {
            if(content.indexOf(key)!=-1){
                console.log(value);
                await message.reply({content:value});
            }
        });
    },
    isQuestion(content){
        if(content.indexOf('?')!=-1 || content.indexOf('？')!=-1){
            return true;
        }
        else if(content.indexOf('什么')!=-1 ||content.indexOf('如何')!=-1 ||
            content.indexOf('怎么')!=-1){
            return true;
        }
        else{
            return false;
        }
    }

};