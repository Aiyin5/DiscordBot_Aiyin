const { Interaction } = require("discord.js");
const{data}=require('../../beforInterception.json');
const map = new Map(Object.entries(data));

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        //console.log(message.content);
        let content=message.content.toLowerCase();
        map.some( async (value, key) => {
            if(content.indexOf(key)!=-1){
                console.log(value);
                await message.reply({content:value});
                return true;
            }
        });
    },
};