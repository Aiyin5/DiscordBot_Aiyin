const { Interaction } = require("discord.js");
const{data}=require('../../beforInterception.json');
const map = new Map(Object.entries(data));

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        console.log(message.content);
        map.forEach( async (value, key) => {
            if(message.content.indexOf(key)!=-1){
                console.log(value);
                await message.reply({content:value});
            }
        });
    },
};