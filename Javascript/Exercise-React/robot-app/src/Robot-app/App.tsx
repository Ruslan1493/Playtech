import React from 'react';
import '../Robot-app/playtech-section1.css';
import '../Robot-app/media-queries.css';
import '../Robot-app/playtech-section1-messages.css';
import '../Robot-app/playtech-section2.css';

function App() {
  const robots = [];
  return (

      <main>
        <section id="slide-1" className="factory-section">
          <p className="factory-header">Basic Robot</p>
          <div className="content-wrapper">
            <div className="robotWrapper">
              <div id="robot">
                <p className="robot-bubble bubble"></p>
                <div id="robot-head">
                  <div className="robot-eyes"></div>
                  <div className="robot-eyes"></div>
                  <div id="robot-mouth"></div>
                </div>
                <div id="robot-body">
                  <div className="hands"></div>
                  <div className="hands"></div>
                  <div className="rock"></div>
                </div>
                <div id="robot-legs">
                  <div className="legs"></div>
                  <div className="legs"></div>
                </div>
              </div>
              <p className="robot-name">Robot name</p>

            </div>
            <div className="boxesWrapper">
              <div className="create-message">
                <label className="error">Please write e message first!</label>
                <div>
                  <label>Send message:</label>
                  <input type="text" id="message-input" placeholder="write message here" />
                </div>
                <button id="sendMessageBtn">Send</button>
                <button id="reverseMessagesOrderBtn">Reverse message order</button>
              </div>

              <div className="messages">
                <p><span>Last messages</span></p>

                <ul>

                </ul>
              </div>
            </div>

          </div>
        </section>

        <div className="slider-buttons">
          <div>
            <button id="previous">&lt; Previous</button>
            <button id="next">Next &gt;</button>
          </div>
        </div>

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
      </main>
  );
}

export default App;
