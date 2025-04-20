import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { environment } from "./environment";

const { APPLICATION_ID, SERVER_ID } = environment;

const seedCommands = async (rest: REST, commands: SlashCommandBuilder[]) => {
    try {
        await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, SERVER_ID), {
            body: commands,
        });
    } catch (error) {
        console.error("Error seeding commands to Discord:", error);
    }
};

export { seedCommands };
