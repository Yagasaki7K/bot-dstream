import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";

const commands = [
    {
        name: "ping",
        description: "Diz que tamo on man",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.SECRET_TOKEN as string);

try {
    console.log("Applying commands to app");

    await rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID as string, "684473002938990629"), {
        body: commands,
    });

    console.log("Commands applied");
} catch (error) {
    console.log(error);
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on(Events.ClientReady, (client) => console.log(`Logged in as ${client.user.tag}`));

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply("Tamo online!");
    }
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === "oi") {
        await message.reply("opaaa");
    }

    console.log(`${message.author.displayName}: ${message.content}`);
});

client.login(process.env.SECRET_TOKEN as string);
