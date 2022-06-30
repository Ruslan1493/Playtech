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

    const prevRobot = (): void => {        
        if (selectedRobot && selectedRobot.id === 0) {
            setSelectedRobot(robots[robots.length - 1]);
        } else if (selectedRobot) {
            setSelectedRobot(robots[selectedRobot?.id - 1]);
        }
    }

    const nextRobot = (): void => {
        if (selectedRobot && selectedRobot.id === robots.length - 1) {
            setSelectedRobot(robots[0]);
        } else if (selectedRobot) {
            setSelectedRobot(robots[selectedRobot?.id + 1]);
        }
    }

    return (
        <>
            <section id="slide-1" className="factory-section">
                <p className="factory-header">{selectedRobot ? (selectedRobot.robotType + " Robot") : null}</p>
                <div className="content-wrapper">
                    <RobotWrapper robot={selectedRobot ? selectedRobot : null} />
                    <MessageSection robotsProps={robots} messages={messagesProps} />
                </div>
                    <SliderButtons prevRobot={prevRobot} nextRobot={nextRobot} />
            </section>
        </>

    )
};

export default RobotSection;