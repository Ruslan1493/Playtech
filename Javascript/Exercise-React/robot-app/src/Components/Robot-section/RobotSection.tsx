import React, { FunctionComponent, useEffect, useState } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section1.css';
import '../../CSS/playtech-section1-messages.css';
import { IMessage, IRobot, RobotProps } from '../../interfaces/types';
import RobotType from '../../interfaces/types';
import RobotWrapper from '../Robot-wrapper/RobotWrapper';
import MessageSection from '../Message-section/MessageSection';
import SliderButtons from '../Slider-buttons/SliderButtons';
import RobotManager from '../../models/RobotModel';

const RobotSection: FunctionComponent<RobotProps> = ({ robotsProps, messagesProps }) => {
    const [robots, setRobots] = useState<RobotManager | null>(null);
    const [selectedRobot, setSelectedRobot] = useState<IRobot | null>(null);

    return (
        <>
            <section id="slide-1" className="factory-section">
                <p className="factory-header">Basic Robot</p>
                <div className="content-wrapper">
                    <RobotWrapper robot={selectedRobot} />
                    <MessageSection robotsProps={robots} messages={messagesProps} />
                    <SliderButtons />
                </div>
            </section>

        </>

    )
};

export default RobotSection;