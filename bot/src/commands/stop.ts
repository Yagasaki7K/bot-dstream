import type { Command } from "../types";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { botState } from "../states/watch-messages-state";

const command = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Para de assistir as mensagens.");

const execute = async (interaction: ChatInputCommandInteraction) => {
    if (!botState.watchingMessages) {
        interaction.reply("Aviso: O sistema já está parado!");
    } else {
        botState.watchingMessages = false;
        interaction.reply("Terminado: As mensagens agora não estão mais sendo assistidas");
    }
};

export const stopCommand: Command = {
    data: command,
    execute,
};
