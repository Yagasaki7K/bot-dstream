import { Events, type Client } from "discord.js";

import type { Command } from "../types";

/*
 * Checks and execute received Discord commands
 */

const commandsHandler = async (client: Client, commands: Command[]) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        commands.forEach(async (command) => {
            if (interaction.commandName === command.data.name) {
                await command.execute(interaction);
            }
        });
    });
};

export { commandsHandler };
