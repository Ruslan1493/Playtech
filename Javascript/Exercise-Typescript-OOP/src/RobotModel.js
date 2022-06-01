class Robot {
    static getRobots() {
        return this._robots;
    }
    static addRobot(robot) {
        this._robots.push(robot);
    }
    static replaceCurrentRobots(robots) {
        this._robots = robots;
    }
    static clearRobots() {
        this._robots = [];
    }
    static getRobotsFromLocalStorage(array) {
        this._robots = array;
    }
    static getCurrentRobotIndexSelected() {
        return this._currentRobotIndexSelected;
    }
    static setCurrentRobotIndexSelected(newIndex) {
        this._currentRobotIndexSelected = newIndex;
    }
}
Robot._robots = [];
Robot._currentRobotIndexSelected = 0;
;
export default Robot;
//# sourceMappingURL=RobotModel.js.map