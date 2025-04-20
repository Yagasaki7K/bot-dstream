class BotState {
    private _isWatching = false;
    private _channelId: null | string = null;

    isWatching() {
        return this._isWatching;
    }

    startWatching() {
        this._isWatching = true;
    }

    stopWatching() {
        this._isWatching = false;
    }

    channelId() {
        return this._channelId;
    }

    setChannelId(channelId: string) {
        return (this._channelId = channelId);
    }
}

export const botState = new BotState();
