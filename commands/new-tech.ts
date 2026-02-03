import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('new-tech')
	.setDescription('Submit a new technology for review')
	.addStringOption(option =>
		option.setName('title')
			.setDescription('The name/title of the technology')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('description')
			.setDescription('Additional details about the technology')
			.setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	const title = interaction.options.getString('title', true);
	const description = interaction.options.getString('description') ?? 'No description provided.';

	console.log(`New tech submission:
Title: ${title}
Description: ${description}
Submitted by: ${interaction.user.tag} (${interaction.user.id})`);

	await interaction.reply({
		content: `✅ **Technology Submission Received!**\n\n**Title:** ${title}\n**Description:** ${description}\n\nThank you for your submission!`,
		ephemeral: true
	});
}
