enum RobotType {
    MALE = "Male",
    FEMALE = "Female"
};

interface IRobot {
    name: string,
    robotType: RobotType,
    color: string,
    phrase: string,
    id: number,
    options: {
        'canJump': boolean,
        'canTalk': boolean,
        'canBlink': boolean,
    }
};

interface Options {
    canJump: boolean,
    canTalk: boolean,
    canBlink: boolean,
};

interface IMessage {
    currentRobotsIds: number[],
    creatorId: number,
    message: string,
    time: Date,
    id: number
};

let options: Options = {
    canJump: false,
    canTalk: false,
    canBlink: false,
};

type OptionsObjectKey = keyof typeof options;

export type { IRobot, Options, OptionsObjectKey, IMessage };
export default RobotType;