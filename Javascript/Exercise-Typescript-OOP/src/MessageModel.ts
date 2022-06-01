import { IMessage } from './types.js';

class ChatManager {
    private static _messages: IMessage[] = [];
    private static _showNewMessagesFirst: boolean = true;

    public static getMessages(): IMessage[] {
        return this._messages;
    };

    public static addMessage(message: IMessage): void {
        this._messages.push(message);
    };

    public static replaceCurrentMessages(messages: IMessage[]): void {
        this._messages = messages;
    };

    public static clearMessages(): void {
        this._messages = [];
    };

    public static showNewMessagesFirst(): boolean{
        return this._showNewMessagesFirst;
    };

    public static reverseMessageOrder(): void{
        this._showNewMessagesFirst = !this._showNewMessagesFirst;
        this._messages = [...this._messages].reverse();
    };

};

export default ChatManager;