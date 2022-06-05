class ChatManager {
    static getMessages() {
        return this._messages;
    }
    ;
    static addMessage(message) {
        this._messages.push(message);
    }
    ;
    static getIdAndIncreaseIt() {
        const id = this._id;
        this._id = this._id + 1;
        return id;
    }
    ;
    static replaceCurrentMessages(messages) {
        this._messages = messages;
    }
    ;
    static clearMessages() {
        this._messages = [];
    }
    ;
    static showNewMessagesFirst() {
        return this._showNewMessagesFirst;
    }
    ;
    static orderMessagesByNewest(state) {
        if (state) {
            this._messages = [...this._messages].sort((a, b) => { return b.id - a.id; });
            return;
        }
        this._showNewMessagesFirst = !this._showNewMessagesFirst;
        this._messages = [...this._messages].sort((a, b) => { return a.id - b.id; });
        return;
    }
    ;
    static getTimeInHoursPM(messageInfo) {
        console.log('Message info: ', messageInfo);
        let newDate = new Date(messageInfo.time);
        const timeWithPmAm = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return timeWithPmAm;
    }
    ;
}
ChatManager._id = 0;
ChatManager._messages = [];
ChatManager._showNewMessagesFirst = true;
;
export default ChatManager;
//# sourceMappingURL=MessageModel.js.map