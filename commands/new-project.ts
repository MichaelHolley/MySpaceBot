import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { createProjectIssue } from "../infrastructure/octokit";
import { getUserId } from "../util/get-user-id";

const WHITELISTED_USER_IDS = getUserId() ? [getUserId()!] : [];

export const data = new SlashCommandBuilder()
  .setName("new-project")
  .setDescription("Submit a new project idea")
  .addStringOption((option) =>
    option.setName("title").setDescription("Title of the GitHub issue").setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("description").setDescription("Describe the project idea").setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("name").setDescription("What would you call this project?").setRequired(false),
  )
  .addStringOption((option) =>
    option.setName("goals").setDescription("What are the main goals or outcomes?").setRequired(false),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.guildId) {
    await interaction.reply({
      content: "❌ This command can only be used in Direct Messages (DMs).",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (interaction.user.bot || WHITELISTED_USER_IDS.indexOf(interaction.user.id) === -1) {
    await interaction.reply({
      content: "❌ You are not authorized to use this command.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const title = interaction.options.getString("title", true);
  const description = interaction.options.getString("description", true);
  const name = interaction.options.getString("name");
  const goals = interaction.options.getString("goals");

  await interaction.deferReply();

  try {
    const { url } = await createProjectIssue(title, description, name, goals);
    const displayName = title;
    console.log(
      `New project submission from ${interaction.user.tag} (${interaction.user.id}): ${displayName}`,
    );

    await interaction.editReply({
      content: `✅ **Project Submission Received!**\n**Title:** ${displayName}\n[View on GitHub](${url})`,
    });
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    await interaction.editReply({
      content: "❌ There was an error while submitting your project. Please try again later.",
    });
  }
}
