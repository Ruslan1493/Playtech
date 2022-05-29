enum RobotType {
    MALE = "Male",
    FEMALE = "Female"
};

interface Robot {
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

interface Message {
    currentRobotsIds: number[],
    creatorId: number,
    message: string,
    time: string
};

let options: Options = {
    canJump: false,
    canTalk: false,
    canBlink: false,
};

type OptionsObjectKey = keyof typeof options;

export { Robot, Options, OptionsObjectKey, Message, RobotType };