import type { BotState } from "../states/bot-state";

import type { Command } from "../types";

import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Para de assistir as mensagens.");

const execute = async (interaction: ChatInputCommandInteraction, botState: BotState) => {
    if (!botState.isWatching()) {
        await interaction.reply({
            content: `⚠️ Atenção: As mensagens já não estão sendo monitoradas.`,
            flags: [MessageFlags.Ephemeral],
        });
    } else {
        botState.stopWatching();
        await interaction.reply(
            `🏁 Terminado: As mensagens do canal <#${botState.channelId()}> não estão mais sendo monitoradas.`
        );
    }
};

export const stopCommand: Command = {
    data: command,
    execute,
};
