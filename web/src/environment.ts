import * as z from "zod";

const environmentSchema = z.object({
    VITE_SOCKET_PORT: z.string().default("8000"),
});

export const environment = environmentSchema.parse(import.meta.env);
