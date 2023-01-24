const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('question')
		.setDescription('Ask Gina a question')
		.addStringOption(option => 
			option
				.setName('question')
				.setDescription('Ask Gina a question')
				.setRequired(true)),
			
	async execute(interaction, response) {
		await interaction.editReply(`${response}`);
	},
};