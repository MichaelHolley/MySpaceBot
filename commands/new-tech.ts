import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { createTechIssue } from "../infrastructure/octokit";

const WHITELISTED_USER_IDS = process.env.USER_ID ? [process.env.USER_ID] : [];

export const data = new SlashCommandBuilder()
  .setName("new-tech")
  .setDescription("Submit a new technology for review")
  .addStringOption((option) =>
    option
      .setName("title")
      .setDescription("The name/title of the technology")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("Additional details about the technology")
      .setRequired(false),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.guildId) {
    await interaction.reply({
      content: "❌ This command can only be used in Direct Messages (DMs).",
      ephemeral: true,
    });
    return;
  }

  if (
    interaction.user.bot ||
    WHITELISTED_USER_IDS.indexOf(interaction.user.id) === -1
  ) {
    await interaction.reply({
      content: "❌ You are not authorized to use this command.",
      ephemeral: true,
    });
    return;
  }

  const title = interaction.options.getString("title", true);
  const description = interaction.options.getString("description");

  await interaction.deferReply();

  try {
    const { url } = await createTechIssue(title, description);
    console.log(
      `New tech submission from ${interaction.user.tag} (${interaction.user.id}): ${title}`,
    );

    await interaction.editReply({
      content: `✅ **Tech Submission Received!**\n\n[View on GitHub](${url})`,
    });
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    await interaction.editReply({
      content:
        "❌ There was an error while submitting your technology. Please try again later.",
    });
  }
}
