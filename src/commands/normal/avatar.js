const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const openai = require('../../util/chatBot')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('获取头像')
		.setDescription('Get your own avatar.')
		.addStringOption(option => option.setName('description').setDescription('use words to descripe your avatar')),
	async execute(interaction) {
		await interaction.deferReply();
		const str = interaction.options.getString('description');
		let prt="create an avatar which is "+str;
		try {
			const response = await openai.createImage({
				prompt: prt,
				n: 1,
				size: "256x256",
			});
			const embed = new EmbedBuilder()
				.setColor(2895667)
				.setTimestamp()
				.setTitle("avatar")
				.setDescription(`\`\`\`${response.data.data[0].url}\`\`\``);
			await interaction.editReply({
				embeds: [embed]
			});
		}
		catch (error){
			console.log(error)
			return await interaction.editReply({
				content: 'An error occurred while trying to send the message to seeDaoAi',
				ephemeral: true
			});
		}
	},
};
