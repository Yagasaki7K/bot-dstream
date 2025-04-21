import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { BotState } from "./states/bot-state";

type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction, botState: BotState) => Promise<void>;
};
