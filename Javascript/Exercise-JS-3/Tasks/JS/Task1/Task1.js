const robots = [];

// {
//     name: "123",
//     robotType: 'Male',
//     color: '#fffff',
//     options: {
//         'canJump': true,
//         'canTalk': true,
//         'canBlink': true,
//     }
// }

let currentRobotIndexSelected = 0;
let showTalkAnimation;

function onSubmit(e) {
    let options = {
        'canJump': false,
        'canTalk': false,
        'canBlink': false,
    };

    let name = document.querySelector(".name input").value;
    let robotType = document.querySelector(".select-type select").value;
    let color = document.querySelector(".select-color input").value;

    document.querySelectorAll(".checkbox-wrapper input").forEach(input => {
        input.checked ? options[input.id] = true : options[input.id] = false;
    });

    let phrase = document.querySelector(".write-comment textarea").value;
    const hasError = checkForInputErrors(name, robotType, color, phrase, options);
    if (hasError) {
        return;
    };
    robots.push({
        name, robotType, color, phrase, options
    });

    displayRobot(robots[robots.length - 1]);

    if (robots.length > 1) {
        currentRobotIndexSelected++;
        document.querySelector(".slider-buttons").style.display = 'block';
    };

    name = document.querySelector(".name input").value = '';
    robotType = document.querySelector(".select-type select").value = '';
    color = document.querySelector(".select-color input").value = '#F16527';

    e.preventDefault();
};

function onChangeCanTalkInput(e) {
    let canTalksInput = document.querySelector(".checkbox-wrapper input[id='canTalk']").checked;
    if (!canTalksInput) {
        document.querySelector(".write-comment textarea").value = '';
        return document.querySelector(".write-comment textarea").disabled = true;
    }
    return document.querySelector(".write-comment textarea").disabled = false;
};

function displayRobot(robot) {
    document.querySelector("#slide-1").style.display = 'block';
    document.querySelector(".robot-name").innerHTML = robot.name;
    if (robot.robotType == 'Male') {
        document.querySelector(".factory-header").innerHTML = 'Male Robot';
        document.querySelector(".rock").style.display = 'none';
    } else {
        document.querySelector(".factory-header").innerHTML = 'Female Robot';
        document.querySelector(".rock").style.display = 'block';
        document.querySelector(".rock").style.borderBottom = `41px solid ${robot.color}`;
    }
    document.querySelector("#robot-body").style.borderTop = `85px solid ${robot.color}`;
    displayCanBlink(robot.options.canBlink);
    displayCanJump(robot.options.canJump);
    displayCanTalk(robot.options.canTalk, robot.phrase);

    return;
};

function displayCanJump(canJump) {
    const robotLegs = document.querySelectorAll('.legs');
    if (canJump) {
        robotLegs.forEach(el => {
            el.style.animation = 'robotJump ease-out 2s infinite';
        });
        return;
    }
    robotLegs.forEach(el => {
        el.style.animation = '';
    });
};

function displayCanTalk(canTalk, phrase) {
    window.clearTimeout(showTalkAnimation);

    if (canTalk) {
        document.querySelector('.robot-bubble').style.display = 'block';
        document.querySelector('.robot-bubble').innerHTML = phrase;
        document.querySelector('#robot-mouth').style.animation = 'changeMouth ease-in-out 2s infinite';

        showTalkAnimation = setTimeout(() => {
            document.querySelector('.robot-bubble').style.display = 'none';
            document.querySelector('#robot-mouth').style.animation = '';
        }, 10000);
    } else {
        document.querySelector('.robot-bubble').style.display = 'none';
        document.querySelector('#robot-mouth').style.animation = '';
    }
};

function displayCanBlink(canBlink) {
    if (canBlink) {
        document.querySelector('.robot-eyes').style.animation = 'robotBlink ease-in-out 2s infinite';
    } else {
        document.querySelector('.robot-eyes').style.animation = '';
    }
};

function onClickPrevious() {
    if (currentRobotIndexSelected - 1 >= 0) {
        currentRobotIndexSelected--;
        displayRobot(robots[currentRobotIndexSelected]);
        return;
    };
    currentRobotIndexSelected = robots.length - 1;
    displayRobot(robots[robots.length - 1]);
};

function onClickNext() {
    if (currentRobotIndexSelected + 1 <= robots.length - 1) {
        currentRobotIndexSelected++;
        displayRobot(robots[currentRobotIndexSelected]);
        return;
    };
    currentRobotIndexSelected = 0;
    displayRobot(robots[0]);
};

function onShowCreatedRobots(e) {
    resetTable();

    if (robots.length > 0) {
        document.querySelector('#has-robot-counter').innerHTML = `${robots.length} robots found`;
        document.querySelector('.table').style.visibility = 'visible';
        let table = document.querySelector('.table');
        robots.forEach(robot => {
            let tr = document.createElement('tr');
            let nameTd = document.createElement('td');
            let typeTd = document.createElement('td');
            let colorTd = document.createElement('td');
            let optionsTd = document.createElement('td');
            const optionsArray = [];
            Object.entries(robot.options).forEach(([key, value]) => {
                if (value) {
                    switch (key) {
                        case 'canJump':
                            optionsArray.push('cant jump');
                            break;
                        case 'canTalk':
                            optionsArray.push('cant talk');
                            break;
                        case 'canBlink':
                            optionsArray.push('cant blink');
                            break;
                        default:
                            break;

                    }
                }
            });
            console.log(optionsArray)
            nameTd.innerText = robot.name;
            typeTd.innerText = robot.robotType;
            colorTd.innerText = robot.color;
            optionsTd.innerText = optionsArray.join(', ');
            tr.appendChild(nameTd);
            tr.appendChild(typeTd);
            tr.appendChild(colorTd);
            tr.appendChild(optionsTd);
            // optionsTd
            table.appendChild(tr);
        });

        return;
    }

    document.querySelector('#has-robot-counter').innerHTML = 'No robots created yet';
    document.querySelector('.table').style.visibility = 'hidden';

    e.preventDefault();
};

function resetTable(){
    let table = document.querySelector('.table');
    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    };
};

function checkForInputErrors(name, robotType, color, phrase, options) {
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