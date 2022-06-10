class RobotManager {
    constructor() {
        this._robots = [];
        this._currentRobotIndexSelected = 0;
        this.getRobotsFromLocalStorage();
    }
    getRobots() {
        return this._robots;
    }
    addRobot(robot) {
        this._robots.push(robot);
    }
    replaceCurrentRobots(robots) {
        this._robots = robots;
    }
    clearRobots() {
        localStorage.removeItem('robots');
        this._robots = [];
    }
    getRobotsFromLocalStorage() {
        const robotsFromLocalStorage = JSON.parse(localStorage.getItem('robots'));
        if (robotsFromLocalStorage && robotsFromLocalStorage.length > 0) {
            this._robots = robotsFromLocalStorage;
        }
    }
    getCurrentRobotIndexSelected() {
        return this._currentRobotIndexSelected;
    }
    setCurrentRobotIndexSelected(newIndex) {
        this._currentRobotIndexSelected = newIndex;
    }
    addRobotToLocalStorage(robot) {
        if (!localStorage.getItem('robots')) {
            localStorage.setItem('robots', JSON.stringify([robot]));
            return;
        }
        ;
        let localStorageRobots = JSON.parse(localStorage.getItem('robots'));
        localStorageRobots.push(robot);
        localStorage.setItem('robots', JSON.stringify(localStorageRobots));
    }
}
;
export default RobotManager;
//# sourceMappingURL=RobotManager.js.map