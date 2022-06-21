import { FunctionComponent, useEffect, useState } from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IRobot } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';

const App: FunctionComponent<any> = () => {
  const [robotsManager, setManagerRobots] = useState<RobotManager[]>([]);
  const [robots, setRobots] = useState<IRobot[]>([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('use effect', robotsManager.length);
    getRobotsFromLocalStorage();
    // robotsManager.getRobotsFromLocalStorage();
    // setRobots([...robotsManager]);
  }, [robotsManager.length])


  function getRobotsFromLocalStorage(): void {
    const robotsFromLocalStorage: RobotManager[] = JSON.parse(localStorage.getItem('robots') || '');
    if (robotsFromLocalStorage && robotsFromLocalStorage.length > 0) {
      setManagerRobots(robotsFromLocalStorage);
    }
  }

  function addRobots(robot: IRobot): void {
    console.log(robot);
    // robotsManager.addRobot(newRobot);
    // robotsManager.addRobotToLocalStorage(robotsManager[robotsManager.length - 1]);
    let id: number = 0;
    if (robotsManager.length > 0) {
      id = robotsManager[robotsManager.length - 1].id + 1;
      // console.log('robotsManager.length > 0 = id: ', id);
    }
    const newRobot = new RobotManager(robot.name, robot.robotType, robot.color, robot.phrase, id, robot.options);
    addRobotToLocalStorage(newRobot.getRobotInfo());
    console.log('new RObot ', newRobot.name)
    setManagerRobots([...robotsManager, newRobot]);
  }

  function addRobotToLocalStorage(robot: IRobot): void {
    if (!localStorage.getItem('robots')) {
      localStorage.setItem('robots', JSON.stringify([robot]));
      return;
    };
    let localStorageRobots: IRobot[] = JSON.parse(localStorage.getItem('robots') || '');
    localStorageRobots.push(robot);
    localStorage.setItem('robots', JSON.stringify(localStorageRobots));
  }

  return (
    <main>
      <>
        {
          robotsManager.length > 0 ? <RobotSection robotsProps={robotsManager} messagesProps={messages} /> : null
        }
        <FormSection robotsProps={robots} addRobots={addRobots} />
      </>
    </main >
  );
}

export default App;
