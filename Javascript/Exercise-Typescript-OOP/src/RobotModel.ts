import { IRobot } from './types.js';
// interface IRobot{
//     robots: [];


// };

class Robot {
    private static _robots: IRobot[] = [];
    private static _currentRobotIndexSelected: number = 0;

    public static getRobots(): IRobot[] {
        return Robot._robots;
    }

    public static addRobot(robot: IRobot): void {
        Robot._robots.push(robot);
    }

    public static replaceCurrentRobots(robots: IRobot[]): void {
        Robot._robots = robots;
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