interface Robot {
    name: string,
    robotType: string,
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
}

let options: Options = {
    canJump: false,
    canTalk: false,
    canBlink: false,
};

type OptionsObjectKey = keyof typeof options;

export { Robot, Options, OptionsObjectKey };