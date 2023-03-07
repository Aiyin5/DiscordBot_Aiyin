const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const openai = require('../../util/chatBot')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('获取头像')
		.setDescription('Get your own avatar.')
		.addStringOption(option => option.setName('description').setDescription('use words to descripe your avatar')),
	async execute(interaction) {

		const str = interaction.options.getString('description');
		let prt="create an avatar which is "+str;
		try {
			const response = await openai.createImage({
				prompt: prt,
				n: 1,
				size: "256x256",
			});
			console.log(response.data.data[0].toString());
			const embed = new EmbedBuilder()
				.setColor(2895667)
				.setTimestamp()
				.setTitle("avatar")
				.setDescription(`\`\`\`${response.data.data[0].url.toString()}\`\`\``);
			await interaction.editReply({
				embeds: [embed]
			});
		}
		catch (err){
			return interaction.reply("err");
		}
	},
};
