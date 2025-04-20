import type { Command } from "./types";

import { Events, type Client } from "discord.js";

import { environment } from "./environment";
import { commandsHandler } from "./handlers/command-handler";

const { SECRET_TOKEN } = environment;

/*
 * Manage Discord events
 */

const initializeClient = async (client: Client, commands: Command[]) => {
    try {
        client.on(Events.ClientReady, (client) => {
            console.log(`Discord client is connected as ${client.user.tag}`);
        });

        await commandsHandler(client, commands);

        client.on(Events.MessageCreate, async (message) => {
            console.log(`Message created`);
        });

        await client.login(SECRET_TOKEN);
    } catch (error) {
        console.error("Error ocurred on client: ", error);
    }
};

export { initializeClient };
