class ChatManager {
    static getMessages() {
        return this._messages;
    }
    ;
    static addMessage(message) {
        this._messages.push(message);
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
    static reverseMessageOrder() {
        this._showNewMessagesFirst = !this._showNewMessagesFirst;
        this._messages = [...this._messages].reverse();
    }
    ;
}
ChatManager._messages = [];
ChatManager._showNewMessagesFirst = true;
;
export default ChatManager;
//# sourceMappingURL=MessageModel.js.map