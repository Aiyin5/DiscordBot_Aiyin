const { Interaction } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(messag, client) {
        console.log(messag);
    },
};