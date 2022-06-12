import React from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { IMessage, IRobot, RobotAppState } from '../../interfaces/types';

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
