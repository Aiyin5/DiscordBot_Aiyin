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
        map.forEach( async (value, key) => {
            if(content.indexOf(key)!=-1){
                console.log(value);
                await message.reply({content:value});
            }
        });
    },
};