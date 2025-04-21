import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { environment } from "./environment";

type Message = {
    messageContent: string;
    userId: string;
    userAvatar: string;
    userDisplayName: string;
};

const { VITE_SOCKET_PORT } = environment;

const socketUrl = `http://localhost:${VITE_SOCKET_PORT}`;

const sanitizeHtml = (html: string) => {
    return { __html: html };
};

const ChatApp = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<
        "connecting" | "connected" | "disconnected" | null
    >("connecting");
    const [socket, setSocket] = useState<Socket | null>(null);

    const connectToServer = () => {
        setConnectionStatus("connecting");
        const newSocket = io(socketUrl, {
            transports: ["websocket"],
            autoConnect: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on("connect", () => {
            console.log("Connected to server");
            setConnectionStatus("connected");
            setTimeout(() => setConnectionStatus(null), 3000);
        });

        newSocket.on("message", (messages: Message[]) => {
            setMessages(messages);
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
            setConnectionStatus("disconnected");
        });

        newSocket.on("connect_error", () => {
            setConnectionStatus("disconnected");
        });

        setSocket(newSocket);
    };

    useEffect(() => {
        connectToServer();

        return () => {
            socket?.disconnect();
        };
    }, []);

    const handleReconnect = () => {
        socket?.disconnect();
        connectToServer();
    };

    const getUserColor = (userId: string): string => {
        const colors = [
            "#FF4500",
            "#FF8C00",
            "#FFD700",
            "#90EE90",
            "#00BFFF",
            "#9370DB",
            "#FF69B4",
            "#1E90FF",
            "#32CD32",
            "#FF6347",
        ];

        const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                <div style={styles.messagesContainer}>
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={`${msg.userId}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={styles.messageContainer}
                            >
                                <div style={styles.userInfo}>
                                    <motion.img
                                        src={msg.userAvatar}
                                        alt={msg.userDisplayName}
                                        style={styles.avatar}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, type: "spring" }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "https://via.placeholder.com/24";
                                        }}
                                    />
                                    <span
                                        style={{
                                            ...styles.username,
                                            color: getUserColor(msg.userId),
                                        }}
                                    >
                                        {msg.userDisplayName}
                                    </span>
                                </div>
                                <div
                                    style={styles.messageContent}
                                    dangerouslySetInnerHTML={sanitizeHtml(msg.messageContent)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {connectionStatus !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            ...styles.connectionStatus,
                            backgroundColor:
                                connectionStatus === "connecting"
                                    ? "rgba(234, 179, 8, 0.9)"
                                    : connectionStatus === "connected"
                                    ? "rgba(34, 197, 94, 0.9)"
                                    : "rgba(239, 68, 68, 0.9)",
                            animation:
                                connectionStatus === "connecting" ? "pulse 1.5s infinite" : "none",
                        }}
                    >
                        <div style={styles.connectionStatusDot} />
                        <span>
                            {connectionStatus === "connecting"
                                ? `Conectando ao servidor na porta ${
                                      new URL(socketUrl).port || "8000"
                                  }...`
                                : connectionStatus === "connected"
                                ? "Conectado ao servidor!"
                                : "Sem conexão com o servidor. Reinicie a página após ligar o bot ou clique em"}
                        </span>

                        {connectionStatus === "disconnected" && (
                            <button onClick={handleReconnect} style={styles.reconnectButton}>
                                Tentar Novamente
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ChatStyles {
    container: React.CSSProperties;
    chatContainer: React.CSSProperties;
    messagesContainer: React.CSSProperties;
    messageContainer: React.CSSProperties;
    userInfo: React.CSSProperties;
    avatar: React.CSSProperties;
    username: React.CSSProperties;
    messageContent: React.CSSProperties;
    connectionStatus: React.CSSProperties;
    connectionStatusDot: React.CSSProperties;
    reconnectButton: React.CSSProperties;
}

const styles: ChatStyles = {
    container: {
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },

    chatContainer: {
        width: "400px",
        maxHeight: "600px",
        minHeight: "200px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        padding: "10px",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "white",
    },

    messagesContainer: {
        height: "100%",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    messageContainer: {
        marginBottom: "10px",
        lineHeight: "1.4",
        wordBreak: "break-word",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        marginBottom: "2px",
    },
    avatar: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        marginRight: "8px",
    },
    username: {
        fontWeight: "bold",
        fontSize: "14px",
    },
    messageContent: {
        fontSize: "14px",
        marginLeft: "32px",
    },
    connectionStatus: {
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: "14px",
    },
    connectionStatusDot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        marginRight: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    reconnectButton: {
        marginLeft: "12px",
        padding: "4px 8px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "4px",
        color: "white",
        cursor: "pointer",
        fontSize: "12px",
        transition: "all 0.2s ease",
    },
};

export default ChatApp;
