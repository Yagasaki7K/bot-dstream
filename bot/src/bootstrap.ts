import { Client, GatewayIntentBits, REST, SlashCommandBuilder } from "discord.js";

import { environment } from "./environment";
import { seedCommands } from "./seeder";
import { initializeClient } from "./client";

import { startCommand } from "./commands/start";
import { stopCommand } from "./commands/stop";

import type { Command } from "./types";

const { SECRET_TOKEN } = environment;

const start = async () => {
    /*
     * Initialize dependencies
     */
    const rest = new REST({ version: "10" }).setToken(SECRET_TOKEN);

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    const commands: Command[] = [startCommand, stopCommand];

    /*
     *   Start services
     */
    await seedCommands(rest, commands);
    await initializeClient(client, commands);
};

export { start };
