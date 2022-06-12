import React, { FunctionComponent } from "react";
import '../CSS/media-queries.css';
import '../CSS/playtech-section1.css';
import '../CSS/playtech-section1-messages.css';
import { IMessage, IRobot } from "../interfaces/types";

interface RobotProps {
    robots: IRobot[],
    messages: IMessage[]
}

const RobotSection: FunctionComponent<RobotProps> = ({ robots, messages }) => {
    
    return (
        <>
            <section id="slide-1" className="factory-section">
                <p className="factory-header">Basic Robot</p>
                <div className="content-wrapper">
                    <div className="robotWrapper">
                        <div id="robot">
                            <p className="robot-bubble bubble"></p>
                            <div id="robot-head">
                                <div className="robot-eyes"></div>
                                <div className="robot-eyes"></div>
                                <div id="robot-mouth"></div>
                            </div>
                            <div id="robot-body">
                                <div className="hands"></div>
                                <div className="hands"></div>
                                <div className="rock"></div>
                            </div>
                            <div id="robot-legs">
                                <div className="legs"></div>
                                <div className="legs"></div>
                            </div>
                        </div>
                        <p className="robot-name">Robot name</p>

                    </div>
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

                </div>
            </section>
            <div className="slider-buttons">
                <div>
                    <button id="previous">&lt; Previous</button>
                    <button id="next">Next &gt;</button>
                </div>
            </div>
        </>

    )
};

export default RobotSection;