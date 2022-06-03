import { IMessage } from './types.js';

class ChatManager {
    private static _id: number = 0;
    private static _messages: IMessage[] = [];
    private static _showNewMessagesFirst: boolean = true;

    public static getMessages(): IMessage[] {
        return this._messages;
    };

    public static addMessage(message: IMessage): void {
        this._messages.push(message);
    };

    public static getIdAndIncreaseIt(): number {
        const id = this._id;
        this._id = this._id + 1;
        return id;
    };

    public static replaceCurrentMessages(messages: IMessage[]): void {
        this._messages = messages;
    };

    public static clearMessages(): void {
        this._messages = [];
    };

    public static showNewMessagesFirst(): boolean {
        return this._showNewMessagesFirst;
    };

    public static orderMessagesByNewest(state: boolean): void {
        if (state) {
            this._messages = [...this._messages].sort((a, b) => { return b.id - a.id });
            return;
        }
        this._showNewMessagesFirst = !this._showNewMessagesFirst;
        this._messages = [...this._messages].sort((a, b) => { return a.id - b.id });
        return;
    };

};

export default ChatManager;