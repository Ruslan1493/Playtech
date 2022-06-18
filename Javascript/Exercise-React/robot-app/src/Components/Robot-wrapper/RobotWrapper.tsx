import { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import { RobotWrapperProps } from '../../interfaces/types';

const RobotWrapper: FunctionComponent<RobotWrapperProps> = ({ robot }) => {
    const [canTalk, setCanTalk] = useState<string>('none');
    const [canJump, setCanJump] = useState<string>('');
    const [canBlink, setCanBlink] = useState<string>('');
    const [phrase, setPhrase] = useState<string>('');

    useEffect(() => {
        console.log('cantalk ', robot?.options.canTalk);

        setCanTalk(robot?.options.canTalk ? 'changeMouth ease-in-out 2s infinite' : 'none')
        if (robot?.phrase !== '' || robot.phrase !== undefined) {
            setPhrase(robot?.phrase ? robot?.phrase : '')
        }
        setCanJump(robot?.options.canJump ? 'robotJump ease-out 2s infinite' : 'none');
        setCanBlink(robot?.options.canBlink ? 'robotBlink ease-in-out 2s infinite' : 'none');
    }, [robot]);

    let timer = () => setTimeout(() => {
        setCanTalk('none');
        setPhrase('');
    }, 10000)

    useEffect(() => {
        const timerID = timer();
        return function cleanup() {
            clearTimeout(timerID);
        };
    });

    return (
        <div className="robotWrapper">
            <div id="robot">
                {/* {<p>{counter}</p>} */}
                <p className="robot-bubble bubble" style={{ display: phrase === '' ? 'none' : 'block' }}>{phrase === '' ? '' : phrase}</p>
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