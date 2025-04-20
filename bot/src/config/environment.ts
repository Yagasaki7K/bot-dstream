import * as z from "zod";

/*
 * Add your environment variables schema here
 */

const environmentSchema = z.object({
    PUBLIC_KEY: z.string({
        message: "Set the PUBLIC_KEY in the .env file",
    }),
    APPLICATION_ID: z.string({
        message: "Set the APPLICATION_ID in the .env file",
    }),
    SECRET_KEY: z.string({
        message: "Set the SECRET_KEY in the .env file",
    }),
    SECRET_TOKEN: z.string({
        message: "Set the SECRET_TOKEN in the .env file",
    }),
    SERVER_ID: z.string({
        message: "Set the SERVER_ID in the .env file",
    }),
    SOCKET_PORT: z
        .string({
            message: "Set the SOCKET_PORT in the .env file",
        })
        .optional()
        .default("8000"),
});

const environment = environmentSchema.parse({
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    APPLICATION_ID: process.env.APPLICATION_ID,
    SECRET_KEY: process.env.SECRET_KEY,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    SERVER_ID: process.env.SERVER_ID,
    SOCKET_PORT: process.env.SOCKET_PORT,
});

export { environment };
