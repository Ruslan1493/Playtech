import { FunctionComponent, useEffect, useState } from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IRobot } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';

const App: FunctionComponent<any> = () => {
  const [robotsManager, setManagerRobots] = useState<RobotManager>(new RobotManager());
  const [robots, setRobots] = useState<IRobot[]>([]);
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('use effect', robotsManager.getRobots().length);
  }, [robots.length])

  function addRobots(newRobot: IRobot): void {
    robotsManager.addRobot(newRobot);
    // setCounter(counter + 1);
    setRobots([...robotsManager.getRobots()]);
    console.log('App robots: ', robotsManager.getRobots());
    console.log('App robots: ', robotsManager.getRobots().length);
  }

  return (
    <main>
      <>
        {
          robots.length > 0 ? <RobotSection robotsProps={robots} messagesProps={messages} /> : null
        }
        <FormSection robotsProps={robots} addRobots={addRobots} />
      </>
    </main >
  );
}

export default App;
