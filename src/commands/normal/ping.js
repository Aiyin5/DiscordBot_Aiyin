const { SlashCommandBuilder } = require('discord.js');
const instacnce = require('../../util/caInstance')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getCurrentArr')
		.setDescription('获取当前的前置拦截!'),
	async execute(interaction) {
		let arr=instacnce.getArray();
		return interaction.reply(arr.toString());
	},
};
