import { IMessage } from '../interfaces/types.js';

class MessageManager {
    private _message: string;
    private _id: number = 0;
    private _creatorId: number;
    private _currentRobotsIds: number[] = [];
    private _time: Date = new Date;

    constructor(message: string, id: number, creatorId: number, currentRobotsIds: number[], time: Date) {
        this._message = message;
        this._id = id;
        this._creatorId = creatorId;
        this._currentRobotsIds = currentRobotsIds;
        this._time = time;
    }

    get message(): string {
        return this._message;
    }

    get id(): number {
        return this._id;
    }

    get creatorId(): number {
        return this._creatorId;
    }

    get currentRobotsIds(): number[] {
        return this._currentRobotsIds;
    }
    get time(): Date {
        return this._time;
    }

    public getMessageInfo(): IMessage {
        return {
            message: this.message,
            id: this.id,
            creatorId: this.creatorId,
            currentRobotsIds: this.currentRobotsIds,
            time: this.time,
        }
    }

    // public addMessage(message: IMessage): void {
    //     this._messages.push(message);
    // }

    // public getIdAndIncreaseIt(): number {
    //     this._id = this._id + 1;
    //     return this._id;
    // }

    // public replaceCurrentMessages(): void {
    //     const localStorageMessages: IMessage[] = JSON.parse(<string>localStorage.getItem('messages'));
    //     if (localStorageMessages && localStorageMessages.length > 0) {
    //         this._messages = localStorageMessages;
    //     }
    // }

    // public clearMessages(): void {
    //     localStorage.removeItem('messages');
    //     this._messages = [];
    // }

    // public orderMessagesByNewest(state: boolean): void {
    //     if (state) {
    //         this._messages = [...this._messages].sort((a, b) => { return b.id - a.id });
    //         console.log('new message order: ', this._messages);

    //         return;
    //     }
    //     this._messages = [...this._messages].sort((a, b) => { return a.id - b.id });
    //     console.log('new message order: ', this._messages);
    //     return;
    // }

    // public getTimeInHoursPM(messageInfo: IMessage): string {
    //     console.log('Message info: ', messageInfo);
    //     let newDate = new Date(messageInfo.time);
    //     const timeWithPmAm: string = newDate.toLocaleTimeString('en-US', {
    //         hour: '2-digit',
    //         minute: '2-digit',
    //     });
    //     return timeWithPmAm;
    // }

    public getTimeInHoursPM(): string {
        let newDate = new Date(this.time);
        const timeWithPmAm: string = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return timeWithPmAm;
    }
};

export default MessageManager;