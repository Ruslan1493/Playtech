import { FunctionComponent, useState } from 'react';
import { IMessage, RobotMessageProps } from '../../interfaces/types';

const MessageSection: FunctionComponent<RobotMessageProps> = ({ robotsProps, messagesProps, selectedRobot, addMessage }) => {
    const [messageInput, setMessageInput] = useState<string>('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);

        setMessageInput(e.currentTarget.value)
    }

    const sendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
        const messageInfo: IMessage = {
            message: messageInput,
            id: 0,
            creatorId: selectedRobot?.id || 0,
            currentRobotsIds: robotsProps.map(m => m.id),
            time: new Date()
        }
        addMessage(messageInfo);
    }

    const getTimeInHoursPM = (time: Date): string => {
        let newDate = new Date(time);
        const timeWithPmAm: string = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return timeWithPmAm;
    }

    return (
        <div className="boxesWrapper">
            <div className="create-message">
                <label className="error">Please write e message first!</label>
                <div>
                    <label>Send message:</label>
                    <input type="text" id="message-input" name="messageInput" placeholder="write message here" value={messageInput} onChange={handleChange} />
                </div>
                <button id="sendMessageBtn" onClick={sendMessage}>Send</button>
                <button id="reverseMessagesOrderBtn">Reverse message order</button>
            </div>

            <div className="messages">
                <p><span>Last messages</span></p>
                <ul>
                    {messagesProps.length > 0 ? messagesProps.map((m, i) => {
                        return <li key={i}>
                            <p><span style={{ color: selectedRobot?.color }}>{selectedRobot?.name}</span>{' ' + getTimeInHoursPM(m.time)}</p>
                            <p>{m.message}</p>
                        </li>
                    }) : null}
                </ul>
            </div>
        </div>
    )
};

export default MessageSection;