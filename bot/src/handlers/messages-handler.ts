import { Events, type Client } from "discord.js";

import { botState } from "../states/bot-state";

import { parseCustomMessage } from "../helpers/parse-custom-message";

import type { SocketService } from "../sockets/discord-socket-service";

const messagesHandler = async (client: Client, ioServer: SocketService) => {
    client.on(Events.MessageCreate, async (message) => {
        if (
            botState.isWatching() &&
            botState.channelId() === message.channelId &&
            !message.author.bot
        ) {
            let htmlMessageContent = parseCustomMessage(message.content);

            ioServer.pushMessages({
                messageContent: htmlMessageContent,
                userId: message.author.id,
                userAvatar: message.author.avatarURL() || "",
                userDisplayName: message.author.username,
            });

            ioServer.sendMessages();
        }
    });
};

export { messagesHandler };
