import type { Command } from "./types";

import { Events, type Client } from "discord.js";

import { environment } from "./config/environment";
import { commandsHandler } from "./handlers/command-handler";

import type { SocketService } from "./sockets/discord-socket-service";
import { botState } from "./states/bot-state";

const { SECRET_TOKEN } = environment;

/*
 * Manage Discord events
 */

const initializeClient = async (client: Client, commands: Command[], ioServer: SocketService) => {
    try {
        client.on(Events.ClientReady, (client) => {
            console.log(`Discord client is connected as ${client.user.tag}`);
        });

        await commandsHandler(client, commands);

        client.on(Events.MessageCreate, async (message) => {
            if (
                botState.isWatching() &&
                message.channelId === botState.channelId() &&
                !message.author.bot
            ) {
                ioServer.pushMessages({
                    messageContent: message.content,
                    userId: message.author.id,
                    userAvatar: message.author.avatarURL() || "",
                    userDisplayName: message.author.username,
                });

                ioServer.sendMessages();
            }
        });

        await client.login(SECRET_TOKEN);
    } catch (error) {
        console.error("Error ocurred on client: ", error);
    }
};

export { initializeClient };
