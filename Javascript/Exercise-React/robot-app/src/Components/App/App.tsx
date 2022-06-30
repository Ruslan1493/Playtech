import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IRobot } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';

const App: FunctionComponent<any> = () => {
  const [robotsManager, setManagerRobots] = useState<RobotManager[]>([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('use effect', robotsManager);
    getRobotsFromLocalStorage();
  }, [robotsManager.length === 0])

  const getRobots = useMemo(() => {
    return robotsManager;
  }, [robotsManager.length])

  const getRobotsFromLocalStorage = useCallback((): void => {
    if (localStorage.getItem('robots')) {
      let robotsFromLocalStorage: RobotManager[] = JSON.parse(localStorage.getItem('robots') || '');
      const robotsArr: RobotManager[] = [];
      if (robotsFromLocalStorage && robotsFromLocalStorage.length > 0) {
        robotsFromLocalStorage.forEach(robot => {
          console.log("ROBOTS FROM LOCAL STORAGE INFO", robot);

          const newRobot = new RobotManager(robot.name, robot.robotType, robot.color, robot.phrase, robot.id, robot.options);
          robotsArr.push(newRobot)
        })
        setManagerRobots(robotsArr);
      }
    }
  }, [robotsManager.length === 0])

  const addRobots = useCallback((robot: IRobot): void => {
    let id: number = 0;
    if (robotsManager.length > 0) {
      id = robotsManager[robotsManager.length - 1].id + 1;
    }
    const robotManager = new RobotManager(robot.name, robot.robotType, robot.color, robot.phrase, id, robot.options);

    const newRobot: IRobot = {
      name: robotManager.name,
      robotType: robotManager.robotType,
      color: robotManager.color,
      phrase: robotManager.phrase,
      id,
      options: robotManager.options
    }
    addRobotToLocalStorage(newRobot);
    setManagerRobots([...robotsManager, robotManager]);
  }, [robotsManager.length])

  function addRobotToLocalStorage(robot: IRobot): void {
    if (!localStorage.getItem('robots')) {
      localStorage.setItem('robots', JSON.stringify([robot]));
      return;
    };
    if (localStorage.getItem('robots')) {
      let localStorageRobots: IRobot[] = JSON.parse(localStorage.getItem('robots') || '');
      localStorageRobots.push(robot);
      localStorage.setItem('robots', JSON.stringify(localStorageRobots));
    }
  }

  const deleteAllRobots = (): void => {
    if (localStorage.getItem('robots')) {
      localStorage.removeItem('robots');
      setManagerRobots([]);
    }
  }

  return (
    <main>
      <>
        {
          robotsManager.length > 0 ? <RobotSection robotsProps={getRobots} messagesProps={messages} /> : null
        }
        <FormSection robotsProps={getRobots} addRobots={addRobots} deleteAllRobots={deleteAllRobots} />
      </>
    </main >
  );
}

export default App;
