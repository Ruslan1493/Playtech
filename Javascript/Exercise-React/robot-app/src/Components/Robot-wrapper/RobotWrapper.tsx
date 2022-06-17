import { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import { RobotWrapperProps } from '../../interfaces/types';

const RobotWrapper: FunctionComponent<RobotWrapperProps> = ({ robot }) => {
    const [talkAn, setTalk] = useState<boolean>(false);
    const [canTalk, setcanTalk] = useState<string>('none');
    // let canTalk: string = robot?.options.canTalk ? 'changeMouth ease-in-out 2s infinite' : 'none';
    // const timer = () => setTimeout(() => {
    //     canTalk = robot?.options.canTalk ? 'changeMouth ease-in-out 2s infinite' : 'none';
    // }, 3000)
    let timer = () => setTimeout(() => {
        setcanTalk('none');
        setTalk(true);
    }, 3000)

    useEffect(() => {
        setcanTalk(robot?.options.canTalk ? 'changeMouth ease-in-out 2s infinite' : 'none');
    })

    useEffect(() => {

        const timerId = timer();
        console.log(canTalk);
        // setcanTalk('none')
        return () => {
            clearTimeout(timerId);
            console.log(canTalk);
        };
    }, [talkAn]);

    const canJump: string = robot?.options.canJump ? 'robotJump ease-out 2s infinite' : 'none';
    const canBlink: string = robot?.options.canBlink ? 'robotBlink ease-in-out 2s infinite' : 'none';

    return (
        <div className="robotWrapper">
            <div id="robot">
                <p className="robot-bubble bubble" style={{}}></p>
                <div id="robot-head">
                    <div className="robot-eyes" style={{ animation: canBlink }}></div>
                    <div className="robot-eyes"></div>
                    <div id="robot-mouth" style={{ animation: canTalk }}></div>
                </div>
                <div id="robot-body">
                    <div className="hands"></div>
                    <div className="hands"></div>
                    <div className="rock" style={{ display: robot?.robotType === 'Male' ? 'none' : 'block' }}></div>
                </div>
                <div id="robot-legs">
                    <div className="legs" style={{ animation: canJump }}></div>
                    <div className="legs" style={{ animation: canJump }}></div>
                </div>
            </div>
            <p className="robot-name">{robot?.name}</p>
        </div>
    )
};

export default RobotWrapper;