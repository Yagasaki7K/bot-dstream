import { Events, type Client } from "discord.js";

import { botState } from "../states/bot-state";

import type { SocketService } from "../sockets/discord-socket-service";

/*
 * Checks and manage received Discord messages
 */

const messagesHandler = async (client: Client, ioServer: SocketService) => {
    client.on(Events.MessageCreate, async (message) => {
        if (
            botState.isWatching() &&
            botState.channelId() === message.channelId &&
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
};

export { messagesHandler };
