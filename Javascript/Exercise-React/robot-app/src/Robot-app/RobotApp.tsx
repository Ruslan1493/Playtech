import React from 'react';
import RobotSection from '../robot-section/RobotSection';
import FormSection from '../form-section/FormSections';
import { IMessage, IRobot } from '../interfaces/types';

interface RobotAppState {
  robots: IRobot[],
  messages: IMessage[]
}

class RobotApp extends React.Component<any, RobotAppState>  {

  constructor(props: any) {
    super(props)
    this.state = {
      robots: [],
      messages: []
    }
  }

  public render() {

    return (

      <main>
        <RobotSection robots={this.state.robots} messages={this.state.messages} />
        <FormSection robots={[]} />
      </main >
    );
  }
}

export default RobotApp;
