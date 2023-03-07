const { SlashCommandBuilder } = require('discord.js');
const openai = require('../../util/chatBot')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('获取头像')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addStringOption(option => option.setName('Description').setDescription('描述一下你希望的头像样子')),
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
