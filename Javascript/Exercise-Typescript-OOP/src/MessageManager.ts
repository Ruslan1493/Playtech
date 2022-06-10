import { IMessage } from './types.js';

class ChatManager {
    private _id: number = 0;
    private _messages: IMessage[] = [];

    constructor(){
        this.replaceCurrentMessages();
    }

    public getMessages(): IMessage[] {
        return this._messages;
    }

    public addMessage(message: IMessage): void {
        this._messages.push(message);
    }

    public getIdAndIncreaseIt(): number {
        this._id = this._id + 1;
        return this._id;
    }

    public replaceCurrentMessages(): void {
        const localStorageMessages: IMessage[] = JSON.parse(<string>localStorage.getItem('messages'));
        if(localStorageMessages && localStorageMessages.length > 0){
            this._messages = localStorageMessages;
        }
    }

    public clearMessages(): void {
        localStorage.removeItem('messages');
        this._messages = [];
    }

    public orderMessagesByNewest(state: boolean): void {
        if (state) {
            this._messages = [...this._messages].sort((a, b) => { return b.id - a.id });
            console.log('new message order: ', this._messages);
            
            return;
        }
        this._messages = [...this._messages].sort((a, b) => { return a.id - b.id });
        console.log('new message order: ', this._messages);
        return;
    }

    public getTimeInHoursPM(messageInfo: IMessage): string {
        console.log('Message info: ', messageInfo);
        let newDate = new Date(messageInfo.time);
        const timeWithPmAm: string = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return timeWithPmAm;
    }
};

export default ChatManager;