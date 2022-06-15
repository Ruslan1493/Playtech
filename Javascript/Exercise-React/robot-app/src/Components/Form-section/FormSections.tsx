import React, { ChangeEventHandler, FunctionComponent, useEffect, useState } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section2.css';
import RobotType, { FormProps, IRobot, Options } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';

const FormSection: FunctionComponent<FormProps> = ({ robotsProps, addRobots }) => {
  const [robots, setRobots] = useState<RobotManager | null>(null);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [selectType, setSelectType] = useState<RobotType | string>('');
  const [selectColor, setSelectColor] = useState<string>('');
  const [selectOption, setSelectOption] = useState<Options | string>('');
  let [robotDataEntered, setRobotDataEntered] = useState<IRobot>({
    name: '',
    robotType: RobotType.MALE,
    color: '#e96126',
    phrase: '',
    id: 0,
    options: {
      'canJump': false,
      'canTalk': false,
      'canBlink': false,
    }
  });

  // useEffect(() => {
  //   setRobots(robotsProps);
  // })

  function createRobot(e: Event): void {
    console.log('sub')
    e.preventDefault();
  }

  let handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    const inputValue: string = e.currentTarget.value;
    const name: string = e.currentTarget.name;
    console.log(inputValue)
    setRobotDataEntered({ ...robotDataEntered, [name]: inputValue })
  }

  return (
    <section id="slide-2" className="form-section">
      <h2>Create Robot</h2>
      <div className="form-wrapper">
        <div className="name">
          <label className="error">Please fill the name</label>
          <label>Name</label>
          <input type="text" placeholder="Robot name" name='name' onChange={handleChange} value={robotDataEntered.name} />
        </div>
        <div className="select-type">
          <label className="error">Please select a type</label>
          <label>Select type</label>
          <select name='type' onChange={handleChange} value={robotDataEntered.robotType}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="select-color">
          <label className="error">Please select a color </label>
          <label>Select color</label>
          <input type="color" id="head" name='color' onChange={handleChange} value={robotDataEntered.color} />
        </div>
        <div className="select-option">
          <label>Select options</label>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canJump" checked name='check' onChange={handleChange} defaultChecked={robotDataEntered.options.canJump} />
            <label>can jump</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canTalk" checked name='check' onChange={handleChange} defaultChecked={robotDataEntered.options.canTalk} />
            <label>can talk</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canBlink" checked name='check' onChange={handleChange} defaultChecked={robotDataEntered.options.canBlink} />
            <label>can blink</label>
          </div>
        </div>
        <div className="write-comment">
          <label className="error">Please write a phrase</label>
          <label>Write phrase</label>
          <textarea placeholder="text area" name='text' onChange={handleChange} value={robotDataEntered.phrase}></textarea>
        </div>
      </div>
      <div className="buttons">
        <button id="onSubmitBtn" onClick={() => createRobot}>Create</button>
        <button id="showCreatedRobotsBtn">Show created robots</button>
        <button className="clearLocalStorageBtn">Delete all robots</button>
        <div></div>
      </div>
      <div id="table-section">
        <h2 id="has-robot-counter">No robots created yet</h2>
        {/* <table className="table">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Color</th>
            <th>Options</th>
          </tr>
        </table> */}
      </div>
    </section>
  )
};

export default FormSection;