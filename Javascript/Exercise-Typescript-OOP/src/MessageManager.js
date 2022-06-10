class ChatManager {
    constructor() {
        this._id = 0;
        this._messages = [];
        this.replaceCurrentMessages();
    }
    getMessages() {
        return this._messages;
    }
    addMessage(message) {
        this._messages.push(message);
    }
    getIdAndIncreaseIt() {
        this._id = this._id + 1;
        return this._id;
    }
    replaceCurrentMessages() {
        const localStorageMessages = JSON.parse(localStorage.getItem('messages'));
        if (localStorageMessages && localStorageMessages.length > 0) {
            this._messages = localStorageMessages;
        }
    }
    clearMessages() {
        localStorage.removeItem('messages');
        this._messages = [];
    }
    orderMessagesByNewest(state) {
        if (state) {
            this._messages = [...this._messages].sort((a, b) => { return b.id - a.id; });
            console.log('new message order: ', this._messages);
            return;
        }
        this._messages = [...this._messages].sort((a, b) => { return a.id - b.id; });
        console.log('new message order: ', this._messages);
        return;
    }
    getTimeInHoursPM(messageInfo) {
        console.log('Message info: ', messageInfo);
        let newDate = new Date(messageInfo.time);
        const timeWithPmAm = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return timeWithPmAm;
    }
}
;
export default ChatManager;
//# sourceMappingURL=MessageManager.js.map