const { SlashCommandBuilder } = require('discord.js');
const openai = require('../../util/chatBot')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('获取头像')
		.setDescription('Get your own avatar.')
		.addStringOption(option => option.setName('description').setDescription('use words to descripe your avatar')),
	async execute(interaction) {
		const str = interaction.options.getString('Description');
		let prt="create an avatar which is "+str;
		try {
			const response = await openai.createImage({
				prompt: prt,
				n: 1,
				size: "256x256",
			});
			return interaction.reply(response.data[0].url);
		}
		catch (err){
			return interaction.reply(err);
		}
	},
};
