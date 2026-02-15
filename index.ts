import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import * as newTechCommand from "./commands/new-tech";
import { registerCommands } from "./commands/register-commands";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("DISCORD_TOKEN is not defined in the environment variables.");
  process.exit(1);
}

await registerCommands();

const client = new Client({
  intents: [GatewayIntentBits.DirectMessages],
});

client.once(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "new-tech") {
    try {
      await newTechCommand.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`, error);

      const errorMessage = "There was an error while executing this command!";
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: errorMessage,
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: errorMessage,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
});

client.login(token);
