import React, { FunctionComponent, useEffect, useState } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section1.css';
import '../../CSS/playtech-section1-messages.css';
import { IMessage, IRobot, RobotProps } from '../../interfaces/types';
import RobotType from '../../interfaces/types';
import RobotWrapper from '../Robot-wrapper/RobotWrapper';
import MessageSection from '../Message-section/MessageSection';
import SliderButtons from '../Slider-buttons/SliderButtons';

const RobotSection: FunctionComponent<RobotProps> = ({ robotsProps, messagesProps }) => {
    const [robots, setRobots] = useState<IRobot[]>([]);
    const [selectedRobot, setSelectedRobot] = useState<IRobot>({
        name: '',
        robotType: RobotType.MALE,
        color: '',
        phrase: '',
        id: 0,
        options: {
            'canJump': false,
            'canTalk': false,
            'canBlink': false,
        }
    });

    return (
        <>
            <section id="slide-1" className="factory-section">
                <p className="factory-header">Basic Robot</p>
                <div className="content-wrapper">
                    <RobotWrapper robot={selectedRobot} />
                    <MessageSection robots={robots} messages={messagesProps} />
                    <SliderButtons />
                </div>
            </section>

        </>

    )
};

export default RobotSection;