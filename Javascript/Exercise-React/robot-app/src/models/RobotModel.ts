import { IRobot } from './types.js';

class Robot {
    private static _robots: IRobot[] = [];
    private static _currentRobotIndexSelected: number = 0;

    public static getRobots(): IRobot[] {
        return this._robots;
    }

    public static addRobot(robot: IRobot): void {
        this._robots.push(robot);
    }

    public static replaceCurrentRobots(robots: IRobot[]): void {
        this._robots = robots;
    }

    public static clearRobots(): void {
        this._robots = [];
    }

    public static getRobotsFromLocalStorage(array: IRobot[]): void {
        this._robots = array;
    }

    public static getCurrentRobotIndexSelected(): number {
        return this._currentRobotIndexSelected;
    }

    public static setCurrentRobotIndexSelected(newIndex: number): void {
        this._currentRobotIndexSelected = newIndex;
    }
};



export default Robot;