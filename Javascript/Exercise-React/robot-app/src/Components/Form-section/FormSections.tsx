import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section2.css';
import { RobotType, FormProps, IRobot, IErrors } from '../../interfaces/types';
import RobotManager from '../../models/RobotModel';
import checkForRobotInputErrors from '../../models/errorHandling';

const FormSection: FunctionComponent<FormProps> = ({ robotsProps, addRobots, deleteAllRobots }) => {
  const [robots, setRobots] = useState<RobotManager[]>([]);
  const [errorLabels, setErrorLabels] = useState<IErrors>({
    'name': 'hidden',
    'select-color': 'hidden',
    'write-comment': 'hidden',
  });
  let tempRobots: RobotManager[] = useMemo(() => {
    return robotsProps
  }, [robotsProps]);
  const [showRobotsVisibility, setShowRobotsVisibility] = useState<boolean>(false);

  const [robotDataEntered, setRobotDataEntered] = useState<IRobot>({
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

  useEffect(() => {
    setRobots(robotsProps);
  }, [robotsProps])

  function onSubmitHandler(e: React.FormEvent<HTMLButtonElement>): void {
    console.log(robotDataEntered);

    const { hasError, errors } = checkForRobotInputErrors(
      robotDataEntered.name,
      robotDataEntered.color,
      robotDataEntered.phrase,
      robotDataEntered.options
    );

    if (hasError) {
      setErrorLabels(errors);
    } else {
      addRobots(robotDataEntered);
      setRobotDataEntered({
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
      })
      setErrorLabels({
        'name': 'hidden',
        'select-color': 'hidden',
        'write-comment': 'hidden'
      });
    }

    console.log('Has error', hasError);
    console.log('Errors', errors);
    e.preventDefault();
  }

  const showRobots = (): void => {
    setShowRobotsVisibility(true);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    e.stopPropagation();
    let inputValue: string | boolean = e.currentTarget.value;
    const name: string = e.currentTarget.name;
    let type: any;
    if (name === 'robotType') {
      type = inputValue === 'Male' ? RobotType.MALE : RobotType.FEMALE;
      setRobotDataEntered({ ...robotDataEntered, robotType: type });
    } else if (name === 'canJump' || name === 'canTalk' || name === 'canBlink') {
      const isChecked: boolean = (e.target as HTMLInputElement).checked;
      setRobotDataEntered({ ...robotDataEntered, options: { ...robotDataEntered.options, [name]: isChecked } });
    } else {
      setRobotDataEntered({ ...robotDataEntered, [name]: inputValue });
    }
  }

  return (
    <section id="slide-2" className="form-section">
      <h2>Create Robot</h2>
      <div className="form-wrapper">
        <div className="name">
          <label className="error" style={{ visibility: errorLabels['name'] === 'visible' ? 'visible' : 'hidden' }}>Please fill the name</label>
          <label>Name</label>
          <input type="text" placeholder="Robot name" name='name' onChange={handleChange} value={robotDataEntered.name} />
        </div>
        <div className="select-type">
          <label className="error">Please select a type</label>
          <label>Select type</label>
          <select name='robotType' onChange={handleChange} value={robotDataEntered.robotType}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="select-color">
          <label className="error" style={{ visibility: errorLabels['select-color'] === 'visible' ? 'visible' : 'hidden' }}>Please select a color </label>
          <label>Select color</label>
          <input type="color" id="head" name='color' onChange={handleChange} value={robotDataEntered.color} />
        </div>
        <div className="select-option">
          <label>Select options</label>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canJump" name='canJump' onChange={handleChange} checked={robotDataEntered.options.canJump} />
            <label>can jump</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canTalk" name='canTalk' onChange={handleChange} checked={robotDataEntered.options.canTalk} />
            <label>can talk</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" id="canBlink" name='canBlink' onChange={handleChange} checked={robotDataEntered.options.canBlink} />
            <label>can blink</label>
          </div>
        </div>
        <div className="write-comment">
          <label className="error" style={{ visibility: errorLabels['write-comment'] === 'visible' ? 'visible' : 'hidden' }}>Please write a phrase</label>
          <label>Write phrase</label>
          <textarea placeholder="text area" disabled={robotDataEntered.options.canTalk === true ? false : true} name='phrase' onChange={handleChange} value={robotDataEntered.phrase}></textarea>
        </div>
      </div>
      <div className="buttons">
        <button id="onSubmitBtn" onClick={onSubmitHandler}>Create</button>
        <button id="showCreatedRobotsBtn" onClick={showRobots}>Show created robots</button>
        <button className="clearLocalStorageBtn" onClick={deleteAllRobots}>Delete all robots</button>
        <div></div>
      </div>
      <div id="table-section">
        <h2 id="has-robot-counter" style={{ visibility: robots.length > 0 ? 'hidden' : 'visible' }}>No robots created yet</h2>
        {robots.length > 0 ?
          <table className="table" style={{ visibility: showRobotsVisibility ? 'visible' : 'collapse' }}>
            <tbody>
              <>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Color</th>
                  <th>Options</th>
                </tr>
                {robots.length > 0 && robots.map((robot, i) => {
                  console.log('ROBOTS', robot);

                  return (
                    <tr key={i}>
                      <td>{robot.name}</td>
                      <td>{robot.robotType}</td>
                      <td>{robot.color}</td>
                      <td>{robot.getOptions()}</td>
                    </tr>
                  )
                })}
              </>
            </tbody>
          </table>
          :
          null
        }
      </div>
    </section >
  )
};

export default React.memo(FormSection);