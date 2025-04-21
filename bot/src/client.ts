import type { Command } from "./types";

import { Events, type Client } from "discord.js";

import { environment } from "./config/environment";

import { commandsHandler } from "./handlers/command-handler";
import { messagesHandler } from "./handlers/messages-handler";

import type { SocketService } from "./sockets/discord-socket-service";
import type { BotState } from "./states/bot-state";

const { SECRET_TOKEN } = environment;

/*
 * Manage Discord events
 */

const initializeClient = async (
    client: Client,
    commands: Command[],
    ioServer: SocketService,
    botState: BotState
) => {
    try {
        client.on(Events.ClientReady, (client) => {
            console.log(`Discord client is connected as ${client.user.tag}`);
        });

        await commandsHandler(client, commands, botState);
        await messagesHandler(client, ioServer, botState);

        await client.login(SECRET_TOKEN);
    } catch (error) {
        console.error("Error ocurred on client: ", error);
    }
};

export { initializeClient };
