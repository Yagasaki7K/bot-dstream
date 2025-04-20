import { start } from "./src/bootstrap";

await start().catch((error) => console.error("Error during startup: ", error));
