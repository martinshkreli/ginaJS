require('dotenv').config();
const { Events } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const request = require('request');

module.exports = {
	
	name: Events.InteractionCreate,
	async execute(interaction) {
		const configuration = new Configuration({
			organization: process.env.OPENAIORG,
			apiKey: process.env.OPENAIKEY,
		});
		
		async function runIt(parameter, temperature = 0.8) {
			let prompt = `${parameter}`;
			let temperature = Math.min(Math.max(temperature, 0), 1);
			var payload = {
				'method': 'POST',
				'url': 'https://api.openai.com/v1/completions',
				'headers': {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.OPENAIKEY}`,
				},
				'body': JSON.stringify({
					'model': 'text-davinci-003',
				"prompt": prompt,
				"max_tokens": 3500,
				"temperature": temperature,
				})
			};
			return new Promise(function (resolve, reject) {
				request(payload, (error, response, body) => {
					if (error) {
						console.log(error);
						reject(error);
					} else {
						resolve(response);
					}
				});
			});
		}
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName)
		const question = interaction.options.getString('question');

		function singleQuestion(question) {
			let prompt = `${question}`;
			return runIt(prompt);
		  }
		await interaction.deferReply();
		let answer;
		await singleQuestion(question).then((x) => {
			let response = JSON.parse(x.body);
			let tempans = response.choices[0].text;
			tempans = tempans.replace(/\n/g, "");
			answer = tempans;
		});
		
		
		 if (!command) {
		 	console.error(`No command matching ${interaction.commandName} was found.`);
		 	return;
	 }

		try {
			await command.execute(interaction, answer);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
