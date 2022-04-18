// import { checkForInputErrors } from './errorValidator.js';
// const checkForInputErrors = require('./errorValidator.js');

const robots = [];

let options = {
    'canJump': false,
    'canTalk': false,
    'canBlink': false,
};

function onSubmit(e) {
    let name = document.querySelector(".name input").value;
    let robotType = document.querySelector(".select-type select").value;
    let color = document.querySelector(".select-color input").value;

    document.querySelectorAll(".checkbox-wrapper input").forEach(input => {
        input.checked ? options[input.id] = true : options[input.id] = false;
    });

    let phrase = document.querySelector(".write-comment textarea").value;
    const hasError = checkForInputErrors(name, robotType, color, phrase);
    if (hasError) {
        return;
    };
    robots.push({
        name, robotType, color, phrase, options
    });
    displayRobot(robots[robots.length - 1]);

    name = document.querySelector(".name input").value = '';
    robotType = document.querySelector(".select-type select").value = '';
    color = document.querySelector(".select-color input").value = '#F16527';
    e.preventDefault();
};

function onChangeCanTalkInput(e) {
    console.log(e)
    let canTalksInput = document.querySelector(".checkbox-wrapper input[id='canTalk']").checked;
    if (!canTalksInput) {
        return document.querySelector(".write-comment textarea").disabled = true;
    }
    return document.querySelector(".write-comment textarea").disabled = false;
};

function displayRobot(robot) {
    document.querySelector("#slide-1").style.display = 'block';
    document.querySelector(".robot-name").innerHTML = robot.name;
    if(robot.robotType == 'Male'){
        document.querySelector(".factory-header").innerHTML = 'Male Robot';
    }else{
        document.querySelector(".factory-header").innerHTML = 'Female Robot';
        document.querySelector(".rock").style.display = 'block';
        document.querySelector(".rock").style.borderBottom = `41px solid ${robot.color}`;
    }
    document.querySelector("#robot-body").style.borderTop = `85px solid ${robot.color}`;
  
    return;
}

function checkForInputErrors(name, robotType, color, phrase) {
    let hasError = false;
    if (!name) {
        document.querySelector(".name label[name='error']").style.visibility = 'visible';
        hasError = true;
    } else {
        document.querySelector(".name label[name='error']").style.visibility = 'hidden';
    }

    if (!robotType) {
        document.querySelector(".select-type label[name='error']").style.visibility = 'visible';
        hasError = true;
    } else {
        document.querySelector(".select-type label[name='error']").style.visibility = 'hidden';
    }

    if (!color) {
        document.querySelector(".select-color label[name='error']").style.visibility = 'visible';
        hasError = true;
    } else {
        document.querySelector(".select-color label[name='error']").style.visibility = 'hidden';
    }

    if (!phrase && options.canTalk) {
        document.querySelector(".write-comment label[name='error']").style.visibility = 'visible';
        hasError = true;
    } else {
        document.querySelector(".write-comment label[name='error']").style.visibility = 'hidden';
    }

    if (!hasError) {
        return false;
    }
    return true;
};