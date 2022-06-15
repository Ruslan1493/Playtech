import { FunctionComponent } from 'react';
import { RobotMessageProps } from '../../interfaces/types';

const MessageSection: FunctionComponent<RobotMessageProps> = ({ robotsProps, messages }) => {

    return (
        <div className="boxesWrapper">
            <div className="create-message">
                <label className="error">Please write e message first!</label>
                <div>
                    <label>Send message:</label>
                    <input type="text" id="message-input" placeholder="write message here" />
                </div>
                <button id="sendMessageBtn">Send</button>
                <button id="reverseMessagesOrderBtn">Reverse message order</button>
            </div>

            <div className="messages">
                <p><span>Last messages</span></p>
                <ul>
                </ul>
            </div>
        </div>
    )
};

export default MessageSection;