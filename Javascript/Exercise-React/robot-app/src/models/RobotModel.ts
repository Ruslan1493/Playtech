import { IRobot, Options, RobotType } from '../interfaces/types';

class RobotManager {
    private _name: string = '';
    private _robotType: RobotType = RobotType.MALE;
    private _color: string = '#e96126';
    private _phrase: string = '';
    private _id: number = 0;
    private _options: Options = {
        canJump: false,
        canTalk: false,
        canBlink: false,
    };

    constructor(name: string, robotType: RobotType, color: string, phrase: string, id: number, options: Options) {
        this._name = name;
        this._robotType = robotType;
        this._color = color;
        this._phrase = phrase;
        this._id = id;
        this._options = options;
    }

    public get name(): string {
        return this._name;
    }

    public get robotType(): RobotType {
        return this._robotType;
    }

    public get color(): string {
        return this._color;
    }

    public get phrase(): string {
        return this._phrase;
    }

    public get id(): number {
        return this._id;
    }

    public get options(): Options {
        return this._options;
    }

    public getRobotInfo(): IRobot {
        return {
            name: this.name,
            robotType: this.robotType,
            color: this.color,
            phrase: this.phrase,
            id: this.id,
            options: this.options,
        }
    }

    public getOptions(): string {
        const optionsArr: string[] = [];
        for (const [key, value] of Object.entries(this.options)) {
            if(value === true){
                optionsArr.push(key)
            }
        }
        const result = optionsArr.join(', ');
        return result;
    }

    // public clearRobots(): void {
    //     localStorage.removeItem('robots');
    //     this._robots = [];
    // }

    // public getRobotsFromLocalStorage(): void {
    //     const robotsFromLocalStorage: IRobot[] = JSON.parse(<string>localStorage.getItem('robots'));
    //     if (robotsFromLocalStorage && robotsFromLocalStorage.length > 0) {
    //         this._robots = robotsFromLocalStorage;
    //     }
    // }

    // public getCurrentRobotIndexSelected(): number {
    //     return this._currentRobotIndexSelected;
    // }

    // public setCurrentRobotIndexSelected(newIndex: number): void {
    //     this._currentRobotIndexSelected = newIndex;
    // }

    // public addRobotToLocalStorage(robot: IRobot): void {
    //     if (!localStorage.getItem('robots')) {
    //         localStorage.setItem('robots', JSON.stringify([robot]));
    //         return;
    //     };
    //     let localStorageRobots: IRobot[] = JSON.parse(<string>localStorage.getItem('robots'));
    //     localStorageRobots.push(robot);
    //     localStorage.setItem('robots', JSON.stringify(localStorageRobots));
    // }
};



export default RobotManager;