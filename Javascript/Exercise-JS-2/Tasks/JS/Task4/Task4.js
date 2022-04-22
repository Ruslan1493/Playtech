const robots = [];

let currentRobotIndexSelected = 0;

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
    // displayCanJump(options.canJump);
    // displayCanTalk(options.canTalk, phrase);
    // displayCanBlink(options.canBlink);
    console.log(options)
    displayRobot(robots[robots.length - 1]);

    if (robots.length > 1) {
        currentRobotIndexSelected++;
        document.querySelector(".slider-buttons").style.display = 'block';
    };

    name = document.querySelector(".name input").value = '';
    robotType = document.querySelector(".select-type select").value = '';
    color = document.querySelector(".select-color input").value = '#F16527';

    console.log(robots)
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
    console.log(robot)
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
    console.log()
    displayCanBlink(robot.options.canBlink);
    displayCanJump(robot.options.canJump);
    displayCanTalk(robot.options.canTalk, robot.phrase);

    return;
};

function displayCanJump(canJump) {
    console.log('can jump ' + canJump)
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

let showTalkAnimation;

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
    console.log('index ' + currentRobotIndexSelected)
    if (currentRobotIndexSelected - 1 >= 0) {
        currentRobotIndexSelected--;
        console.log('index ' + currentRobotIndexSelected)
        displayRobot(robots[currentRobotIndexSelected]);
        console.log(robots[currentRobotIndexSelected])
        return;
    };
    currentRobotIndexSelected = robots.length - 1;
    displayRobot(robots[robots.length - 1]);
};

function onClickNext() {
    console.log('index ' + currentRobotIndexSelected)
    if (currentRobotIndexSelected + 1 <= robots.length - 1) {
        currentRobotIndexSelected++;
        displayRobot(robots[currentRobotIndexSelected]);
        console.log('index ' + currentRobotIndexSelected)
        console.log('robots ' + robots)
        console.log(robots[currentRobotIndexSelected])
        return;
    };
    currentRobotIndexSelected = 0;
    displayRobot(robots[0]);
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