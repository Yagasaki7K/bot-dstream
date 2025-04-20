import { Server } from "socket.io";

type Message = {
    userId: string;
    userAvatar: string;
    userDisplayName: string;
    messageContent: string;
};

export interface SocketService {
    pushMessages: (message: Message) => void;
    sendMessages: () => void;
}

class DiscordSocketService implements SocketService {
    private io: Server;
    private messages: Message[] = [];

    constructor(socketService: Server) {
        this.io = socketService;

        this.eventsMapper();
    }

    pushMessages(message: Message) {
        this.messages.push(message);
    }

    sendMessages() {
        this.io.emit("message", this.messages);
    }

    private eventsMapper() {
        this.io.on("connection", (socket) => {
            console.log("The web client is connected");
        });

        this.io.on("disconnect", () => {
            console.log("The web client is disconnected");
        });
    }
}

export { DiscordSocketService };
