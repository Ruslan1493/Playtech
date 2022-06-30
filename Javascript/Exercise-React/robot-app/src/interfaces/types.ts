import MessageManager from "../models/MessageModel";
import RobotManager from "../models/RobotModel";

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
    robotsProps: IRobot[],
    messagesProps: IMessage[],
    addMessage: (message: IMessage) => void
};

interface RobotAppState {
    robots: IRobot[],
    messages: IMessage[]
};

interface FormProps {
    robotsProps: RobotManager[],
    addRobots: (robot: IRobot) => void,
    deleteAllRobots: () => void
};

interface RobotWrapperProps {
    robot: RobotManager | null
};

interface RobotProps {
    robotsProps: RobotManager[],
    messagesProps: MessageManager[],
    addMessage: (message: IMessage) => void
};

interface SliderButtonsProps {
    prevRobot: () => void,
    nextRobot: () => void
};

interface IErrors {
    'name': string,
    'select-color': string,
    'write-comment': string,
};

export type { IRobot, Options, OptionsObjectKey, IMessage, IErrors, RobotAppState, FormProps, RobotWrapperProps, RobotMessageProps, RobotProps, SliderButtonsProps };
export { RobotType };