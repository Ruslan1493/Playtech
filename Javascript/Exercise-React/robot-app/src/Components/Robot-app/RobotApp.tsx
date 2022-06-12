import React from 'react';
import RobotSection from '../Robot-section/RobotSection';
import FormSection from '../Form-section/FormSections';
import { RobotAppState } from '../../interfaces/types';

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
        <RobotSection robotsProps={this.state.robots} messagesProps={this.state.messages} />
        <FormSection robots={[]} />
      </main >
    );
  }
}

export default RobotApp;
