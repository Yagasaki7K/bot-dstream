import { Events, type Client } from "discord.js";

import type { Command } from "../types";
import type { BotState } from "../states/bot-state";

/*
 * Checks and execute received Discord commands
 */

const commandsHandler = async (client: Client, commands: Command[], botState: BotState) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        commands.forEach(async (command) => {
            if (interaction.commandName === command.data.name) {
                await command.execute(interaction, botState);
            }
        });
    });
};

export { commandsHandler };
