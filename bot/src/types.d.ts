import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};
