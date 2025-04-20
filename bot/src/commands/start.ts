import type { Command } from "../types";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { botState } from "../states/watch-messages-state";

const command = new SlashCommandBuilder()
    .setName("start")
    .setDescription("Começa a assistir as mensagens.");

const execute = async (interaction: ChatInputCommandInteraction) => {
    if (botState.watchingMessages) {
        interaction.reply("Aviso: As mensagens já estão sendo assistidas!");
    } else {
        botState.watchingMessages = true;
        interaction.reply("Inicializado: As mensagens agora estão sendo assistidas");
    }
};

export const startCommand: Command = {
    data: command,
    execute,
};
