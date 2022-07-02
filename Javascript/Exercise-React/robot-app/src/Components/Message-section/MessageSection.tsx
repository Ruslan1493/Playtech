import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { IMessage, RobotMessageProps } from '../../interfaces/types';

const MessageSection: FunctionComponent<RobotMessageProps> = ({ robotsProps, messagesProps, selectedRobot, addMessage }) => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        console.log('MESSAGE SECTION', messagesProps);
        
        setMessages(messagesProps);
    }, [messagesProps.length])

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
        setMessageInput('');
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

    const showCurrentMessage = (message: IMessage): boolean => {
        if (selectedRobot && message.currentRobotsIds.includes(selectedRobot?.id)) {
            return true;
        }
        return false;
    }

    const reverseMessageOrder = (): void => {
        const newMessageOrder: IMessage[] = [...messages];
        newMessageOrder.reverse();
        setMessages(newMessageOrder);
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
                <button id="reverseMessagesOrderBtn" onClick={reverseMessageOrder}>Reverse message order</button>
            </div>
            {selectedRobot && messages.filter(m => m.currentRobotsIds.includes(selectedRobot?.id)).length > 0 ?
                <div className="messages">
                    <p><span>Last messages</span></p>
                    <ul>
                        {messages.length > 0 ? messages.map((m, i) => {
                            return (showCurrentMessage(m)
                                ?
                                <li key={i}>
                                    <p><span style={{ color: robotsProps[m.creatorId].color }}>{robotsProps[m.creatorId].name}</span>{' ' + getTimeInHoursPM(m.time)}</p>
                                    <p>{m.message}</p>
                                </li>
                                :
                                null)
                        }) : null}
                    </ul>
                </div>
                : null
            }
        </div>
    )
};

export default MessageSection;