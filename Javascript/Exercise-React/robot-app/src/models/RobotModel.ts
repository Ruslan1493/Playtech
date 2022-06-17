import { IRobot } from '../interfaces/types.js';

class RobotManager {
    private _robots: IRobot[] = [];
    private _currentRobotIndexSelected: number = 0;

    constructor() {
        this.getRobotsFromLocalStorage();
    }

    public getRobots(): IRobot[] {
        return this._robots;
    }

    public addRobot(robot: IRobot): void {
        this._robots.push({ ...robot, id: this.getCurrentRobotIndexSelected() });
        this.setCurrentRobotIndexSelected(this.getCurrentRobotIndexSelected() + 1)
    }

    public replaceCurrentRobots(robots: IRobot[]): void {
        this._robots = robots;
    }

    public clearRobots(): void {
        localStorage.removeItem('robots');
        this._robots = [];
    }

    public getRobotsFromLocalStorage(): void {
        const robotsFromLocalStorage: IRobot[] = JSON.parse(<string>localStorage.getItem('robots'));
        if (robotsFromLocalStorage && robotsFromLocalStorage.length > 0) {
            this._robots = robotsFromLocalStorage;
        }
    }

    public getCurrentRobotIndexSelected(): number {
        return this._currentRobotIndexSelected;
    }

    public setCurrentRobotIndexSelected(newIndex: number): void {
        this._currentRobotIndexSelected = newIndex;
    }

    public addRobotToLocalStorage(robot: IRobot): void {
        if (!localStorage.getItem('robots')) {
            localStorage.setItem('robots', JSON.stringify([robot]));
            return;
        };
        let localStorageRobots: IRobot[] = JSON.parse(<string>localStorage.getItem('robots'));
        localStorageRobots.push(robot);
        localStorage.setItem('robots', JSON.stringify(localStorageRobots));
    }
};



export default RobotManager;