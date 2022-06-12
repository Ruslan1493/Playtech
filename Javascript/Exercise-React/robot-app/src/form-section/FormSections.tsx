import React, { FunctionComponent } from "react";
import '../CSS/media-queries.css';
import '../CSS/playtech-section2.css';

const FormSection: FunctionComponent<any> = ({ robots }) => {


    return(
        <section id="slide-2" className="form-section">
          <h2>Create Robot</h2>
          <div className="form-wrapper">
            <div className="name">
              <label className="error">Please fill the name</label>
              <label>Name</label>
              <input type="text" placeholder="Robot name" />
            </div>
            <div className="select-type">
              <label className="error">Please select a type</label>
              <label>Select type</label>
              <select>
                <option></option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="select-color">
              <label className="error">Please select a color </label>
              <label>Select color</label>
              <input type="color" id="head" name="head" value="#e96126" />
            </div>
            <div className="select-option">
              <label>Select options</label>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="canJump" checked />
                <label>can jump</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="canTalk" checked />
                <label>can talk</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="canBlink" checked />
                <label>can blink</label>
              </div>
            </div>
            <div className="write-comment">
              <label className="error">Please write a phrase</label>
              <label>Write phrase</label>
              <textarea placeholder="text area"></textarea>
            </div>
          </div>
          <div className="buttons">
            <button id="onSubmitBtn">Create</button>
            <button id="showCreatedRobotsBtn">Show created robots</button>
            <button className="clearLocalStorageBtn">Delete all robots</button>
            <div></div>
          </div>
          <div id="table-section">
            <h2 id="has-robot-counter">No robots created yet</h2>
            <table className="table">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Color</th>
                <th>Options</th>
              </tr>
            </table>
          </div>
        </section>
    )
};

export default FormSection;