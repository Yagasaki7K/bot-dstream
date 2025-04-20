import { Client, GatewayIntentBits, REST } from "discord.js";

import { environment } from "./config/environment";

import { seedCommands } from "./seeder";
import { initializeClient } from "./client";

import { startCommand } from "./commands/start";
import { stopCommand } from "./commands/stop";

import { ioServer } from "./sockets/socket-server";

import type { Command } from "./types";
import { DiscordSocketService } from "./sockets/discord-socket-service";

const { SECRET_TOKEN } = environment;

const start = async () => {
    /*
     * Initialize dependencies
     */
    const discordSocketService = new DiscordSocketService(ioServer);

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
    await initializeClient(client, commands, discordSocketService);
};

export { start };
