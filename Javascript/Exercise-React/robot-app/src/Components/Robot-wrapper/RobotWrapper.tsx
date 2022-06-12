import { FunctionComponent } from 'react';
import { RobotWrapperProps } from '../../interfaces/types';

const RobotWrapper: FunctionComponent<RobotWrapperProps> = ({ robot }) => {

    return (
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
    )
};

export default RobotWrapper;