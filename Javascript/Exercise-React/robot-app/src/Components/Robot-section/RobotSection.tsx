import { FunctionComponent, useEffect, useState } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section1.css';
import '../../CSS/playtech-section1-messages.css';
import { IMessage, IRobot, RobotProps } from '../../interfaces/types';
import { RobotType } from '../../interfaces/types';
import RobotWrapper from '../Robot-wrapper/RobotWrapper';
import MessageSection from '../Message-section/MessageSection';
import SliderButtons from '../Slider-buttons/SliderButtons';
import RobotManager from '../../models/RobotModel';

const RobotSection: FunctionComponent<RobotProps> = ({ robotsProps, messagesProps }) => {
    const [robots, setRobots] = useState<RobotManager[]>([]);
    const [selectedRobot, setSelectedRobot] = useState<RobotManager | null>(null);

    useEffect(() => {
        setRobots(robotsProps);
        setSelectedRobot(robots[robots.length - 1])
    }, [robots.length !== robotsProps.length])

    return (
        <>
            <section id="slide-1" className="factory-section">
                <p className="factory-header">{selectedRobot ? (selectedRobot.robotType + " Robot") : null}</p>
                <div className="content-wrapper">
                    <RobotWrapper robot={selectedRobot ? selectedRobot : null} />
                    <MessageSection robotsProps={robots} messages={messagesProps} />
                    <SliderButtons />
                </div>
            </section>
        </>

    )
};

export default RobotSection;