import { REST, Routes } from "discord.js";
import { data as newTechCommand } from "./commands/new-tech";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APPLICATION_ID;

if (!token || !clientId) {
  console.error(
    "DISCORD_TOKEN or APPLICATION_ID is missing in environment variables.",
  );
  process.exit(1);
}

const commands = [newTechCommand.toJSON()];

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const response: any = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${response.length} application (/) commands.`,
    );
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
