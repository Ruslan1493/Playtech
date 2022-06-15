import React, { useState } from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IRobot } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';

const App = () => {
  const [robots, setRobots] = useState<RobotManager>(new RobotManager());
  const [messages, setMessages] = useState([]);

  function addRobots(newRobot: IRobot): void {
    robots.addRobot(newRobot);
    const newRobots: RobotManager = robots
    setRobots(newRobots);
  }

  return (
    <main>
      {
        robots.getRobots().length > 0 ? <RobotSection robotsProps={robots} messagesProps={messages} /> : null
      }
      <FormSection robotsProps={robots} addRobots={addRobots} />
    </main >
  );
}

export default App;
