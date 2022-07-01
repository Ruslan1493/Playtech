import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IMessage, IRobot } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';
import MessageManager from '../../models/MessageModel';

const App: FunctionComponent<any> = () => {
  const [robotsManager, setManagerRobots] = useState<RobotManager[]>([]);
  const [messagesManager, setManagerMessages] = useState<MessageManager[]>([]);

  useEffect(() => {
    console.log('use effect', robotsManager);
    getRobotsFromLocalStorage();
  }, [robotsManager.length])

  const getRobots = useMemo(() => {
    return robotsManager;
  }, [robotsManager.length])

  const getMessages = useMemo(() => {
    console.log('Messages updated!', messagesManager);
    
    return messagesManager;
  }, [messagesManager.length])

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
    const newRobotManager = new RobotManager(robot.name, robot.robotType, robot.color, robot.phrase, id, robot.options);

    const newRobot: IRobot = {
      name: newRobotManager.name,
      robotType: newRobotManager.robotType,
      color: newRobotManager.color,
      phrase: newRobotManager.phrase,
      id,
      options: newRobotManager.options
    }
    addRobotToLocalStorage(newRobot);
    setManagerRobots([...robotsManager, newRobotManager]);
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

  const addMessage = useCallback((message: IMessage): void => {
    let id: number = 0;
    if (messagesManager.length > 0) {
      id = messagesManager[messagesManager.length - 1].id;
    }
    const newMessageManager: MessageManager = new MessageManager(message.message, id, message.creatorId, message.currentRobotsIds, message.time);
    const newMessage: IMessage = {
      message: newMessageManager.message,
      id,
      creatorId: newMessageManager.creatorId,
      currentRobotsIds: newMessageManager.currentRobotsIds,
      time: newMessageManager.time,
    }
    addMessageToLocalStorage(newMessage)
    setManagerMessages([...messagesManager, newMessageManager])
  }, [messagesManager.length])

  function addMessageToLocalStorage(message: IMessage): void {
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify([message]));
    }
    if (localStorage.getItem('messages')) {
      let localStorageMessages: IMessage[] = JSON.parse(localStorage.getItem('messages') || '');
      localStorageMessages.push(message);
      localStorage.setItem('messages', JSON.stringify(localStorageMessages));
    }
  }

  return (
    <main>
      <>
        {
          robotsManager.length > 0 ? <RobotSection robotsProps={getRobots} messagesProps={getMessages} addMessage={addMessage} /> : null
        }
        <FormSection robotsProps={getRobots} addRobots={addRobots} deleteAllRobots={deleteAllRobots} />
      </>
    </main >
  );
}

export default App;
