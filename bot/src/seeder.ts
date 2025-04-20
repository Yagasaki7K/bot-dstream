import type { Command } from "./types";

import { REST, Routes } from "discord.js";

import { environment } from "./environment";

const { APPLICATION_ID, SERVER_ID } = environment;

/*
 * SMakes discord know our commands
 */

const seedCommands = async (rest: REST, commands: Command[]) => {
    try {
        await rest
            .put(Routes.applicationGuildCommands(APPLICATION_ID, SERVER_ID), {
                body: commands.map((command) => command.data.toJSON()),
            })
            .then(() => {
                console.log("Command seeder is applied");
            });
    } catch (error) {
        console.error("Error seeding commands to Discord:", error);
    }
};

export { seedCommands };
