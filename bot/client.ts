import { Events, type Client, type SlashCommandBuilder } from "discord.js";
import { environment } from "./environment";

type MessageEventHandler = {
    content: string;
    action: () => void;
};

const { SECRET_TOKEN } = environment;

const initializeClient = async (client: Client, commands: SlashCommandBuilder[]) => {
    try {
        client.on(Events.ClientReady, (client) => {
            console.log(`Discord client is connected as ${client.user.tag}`);
        });

        client.on(Events.InteractionCreate, async (interaction) => {
            console.log(`Interaction created`);
        });

        client.on(Events.MessageCreate, async (message) => {
            console.log(`Message created`);
        });

        await client.login(SECRET_TOKEN);
    } catch (error) {
        console.error("Error ocurred on client: ", error);
    }
};

export { initializeClient };
