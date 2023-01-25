const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('question')
		.setDescription('Ask Gina a question')
		.addStringOption(option => 
			option
				.setName('question')
				.setDescription('Ask Gina a question')
				.setRequired(true))
		
		.addStringOption(option => 
			option
				.setName('temperature')
				.setDescription('Provide a temperature')
				.setRequired(false)),

			
	async execute(interaction, response) {
		await interaction.editReply(`${response}`);
	},
};
