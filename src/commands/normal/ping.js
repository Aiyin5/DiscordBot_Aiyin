const { SlashCommandBuilder } = require('discord.js');
const instance = require('../../util/caInstance')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('获取当前的前置拦截!'),
	async execute(interaction) {
		let arr=instance.getArray();
		if(arr.length==0){
			return interaction.reply("没有前置拦截");
		}
		else {
			let str=arr.toString();
			str="当前的前置拦截："+str;
			return interaction.reply(str);
		}

	},
};
