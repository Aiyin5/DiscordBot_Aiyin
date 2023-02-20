const { Interaction } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        console.log(message);
    },
};