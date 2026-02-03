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
	// Logic to be implemented in Task 9
	await interaction.reply({ content: 'Command received! Processing logic will be added soon.', ephemeral: true });
}
