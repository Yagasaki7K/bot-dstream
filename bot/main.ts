import { Client, GatewayIntentBits, REST, SlashCommandBuilder } from "discord.js";

import { environment } from "./environment";
import { seedCommands } from "./seeder";
import { initializeClient } from "./client";

const { SECRET_TOKEN } = environment;

const start = async () => {
    /*
     * Initialize dependencies
     */
    const rest = new REST({ version: "10" }).setToken(SECRET_TOKEN);
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    });

    const commands: SlashCommandBuilder[] = [];

    /*
     *   Start services
     */
    await seedCommands(rest, commands);
    await initializeClient(client, commands);
};

await start().catch((error) => console.error("Error during startup: ", error));
