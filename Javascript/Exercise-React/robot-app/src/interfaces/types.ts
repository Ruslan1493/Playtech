type OptionsObjectKey = keyof typeof options;

enum RobotType {
    MALE = "Male",
    FEMALE = "Female"
};

let options: Options = {
    canJump: false,
    canTalk: false,
    canBlink: false,
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

interface RobotMessageProps {
    robots: IRobot[],
    messages: IMessage[]
};

interface RobotAppState {
    robots: IRobot[],
    messages: IMessage[]
};

interface FormProps {
    robots: IRobot[],
};

interface RobotWrapperProps {
    robot: IRobot
};

interface RobotProps {
    robotsProps: IRobot[],
    messagesProps: IMessage[]
};

export type { IRobot, Options, OptionsObjectKey, IMessage, RobotAppState, FormProps, RobotWrapperProps, RobotMessageProps, RobotProps };
export default RobotType;