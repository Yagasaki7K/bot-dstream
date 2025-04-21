import type { SocketService } from "../sockets/discord-socket-service";

class BotState {
    private _isWatching = false;
    private _channelId: null | string = null;
    private _ioServer: SocketService;

    constructor(ioServer: SocketService) {
        this._ioServer = ioServer;
    }

    isWatching() {
        return this._isWatching;
    }

    startWatching() {
        this._isWatching = true;
    }

    stopWatching() {
        this._isWatching = false;
        this._ioServer.clearMessages();
    }

    channelId() {
        return this._channelId;
    }

    setChannelId(channelId: string) {
        return (this._channelId = channelId);
    }
}

export { BotState };
