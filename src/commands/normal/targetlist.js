const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('领取新人任务')
        .setDescription('获取新人任务.'),
    async execute(interaction) {
        return interaction.reply(`当前的任务列表: https://seedao.notion.site/73d83a0a258d4ac5afa57a997114755a?v=6c4c36dbcdc74e97af55d02664ef2fb2}`);
    },
};
