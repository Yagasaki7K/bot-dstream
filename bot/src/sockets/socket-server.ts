import { createServer } from "http";
import { Server } from "socket.io";

import { environment } from "../config/environment";

const { SOCKET_PORT } = environment;

const httpServer = createServer();

const ioServer = new Server(httpServer);

httpServer.listen(SOCKET_PORT, () => {
    console.log(`Socket server is up and running on port ${SOCKET_PORT}`);
});

export { ioServer };
