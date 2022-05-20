import { Robot, OptionsObjectKey, Options } from './types';

const robots: Robot[] = [];

const messages: string[] = [];

let currentRobotIndexSelected: number = 0;
let showTalkAnimation: any;


function onSubmit(e: any): void {
    let options: Options = {
        canJump: false,
        canTalk: false,
        canBlink: false,
    };
    let id: number;

    let name: string = (<HTMLInputElement>document.querySelector(".name input")).value;
    let robotType: string = (<HTMLInputElement>document.querySelector(".select-type select")).value;
    let color: string = (<HTMLInputElement>document.querySelector(".select-color input")).value;

    let checkboxElement: HTMLInputElement[] = Array.from(document.querySelectorAll(".checkbox-wrapper input"));

    checkboxElement.forEach((input: HTMLInputElement, i: number) => {
        const inputId = input.id as OptionsObjectKey;
        input.checked ? options[inputId] = true : options[inputId] = false;
    });

    let phrase: string = (<HTMLInputElement>document.querySelector(".write-comment textarea")).value;
    const hasError: boolean = checkForRobotInputErrors(name, robotType, color, phrase, options);
    if (hasError) {
        return;
    };

    if (robots.length > 0) {
        console.log('last robot id = ', robots[robots.length - 1].id)
        id = robots[robots.length - 1].id;
        id++;
    } else {
        id = 0;
    }
    // console.log('id ', id)
    // id = robots.length > 0 ? robots[robots.length - 1].id += 1 : 0;

    // console.log('index of robot ', currentRobotIndexSelected)
    robots.push({
        name, robotType, color, phrase, options, id
    });

    if (robots.length > 1) {
        currentRobotIndexSelected = id;
        (<HTMLDivElement>document.querySelector(".slider-buttons")).style.display = 'block';
    };

    displayRobot(robots[robots.length - 1]);


    name = (<HTMLInputElement>document.querySelector(".name input")).value = '';
    robotType = (<HTMLInputElement>document.querySelector(".select-type select")).value = '';
    color = (<HTMLInputElement>document.querySelector(".select-color input")).value = '#F16527';
    showMessages();
    e.preventDefault();
};

function onChangeCanTalkInput(e: any): boolean {
    let canTalksInput: boolean = (<HTMLInputElement>document.querySelector(".checkbox-wrapper input[id='canTalk']")).checked;
    if (!canTalksInput) {
        (<HTMLInputElement>document.querySelector(".write-comment textarea")).value = '';
        return (<HTMLInputElement>document.querySelector(".write-comment textarea")).disabled = true;
    }
    return (<HTMLInputElement>document.querySelector(".write-comment textarea")).disabled = false;
};

function displayRobot(robot: Robot): void {
    console.log(robot)
    showMessages();

    (<HTMLElement>document.querySelector("#slide-1")).style.display = 'block';
    (<HTMLElement>document.querySelector(".robot-name")).innerHTML = robot.name;
    if (robot.robotType == 'Male') {
        (<HTMLElement>document.querySelector(".factory-header")).innerHTML = 'Male Robot';
        (<HTMLElement>document.querySelector(".rock")).style.display = 'none';
    } else {
        (<HTMLElement>document.querySelector(".factory-header")).innerHTML = 'Female Robot';
        (<HTMLElement>document.querySelector(".rock")).style.display = 'block';
        (<HTMLElement>document.querySelector(".rock")).style.borderBottom = `41px solid ${robot.color}`;
    }
    (<HTMLElement>document.querySelector("#robot-body")).style.borderTop = `85px solid ${robot.color}`;
    displayCanBlink(robot.options.canBlink);
    displayCanJump(robot.options.canJump);
    displayCanTalk(robot.options.canTalk, robot.phrase);
    return;
};

function displayCanJump(canJump: boolean): void {
    const robotLegs: HTMLElement[] | null = Array.from(document.querySelectorAll('.legs'));
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

function displayCanTalk(canTalk: boolean, phrase: string): void {
    window.clearTimeout(showTalkAnimation);

    if (canTalk) {
        (<HTMLElement>document.querySelector('.robot-bubble')).style.display = 'block';
        (<HTMLElement>document.querySelector('.robot-bubble')).innerHTML = phrase;
        (<HTMLElement>document.querySelector('#robot-mouth')).style.animation = 'changeMouth ease-in-out 2s infinite';

        showTalkAnimation = setTimeout(() => {
            (<HTMLElement>document.querySelector('.robot-bubble')).style.display = 'none';
            (<HTMLElement>document.querySelector('#robot-mouth')).style.animation = '';
        }, 10000);
    } else {
        (<HTMLElement>document.querySelector('.robot-bubble')).style.display = 'none';
        (<HTMLElement>document.querySelector('#robot-mouth')).style.animation = '';
    }
};

function displayCanBlink(canBlink: boolean) {
    if (canBlink) {
        (<HTMLElement>document.querySelector('.robot-eyes')).style.animation = 'robotBlink ease-in-out 2s infinite';
    } else {
        (<HTMLElement>document.querySelector('.robot-eyes')).style.animation = '';
    }
};

function onClickPrevious(): void {
    if (currentRobotIndexSelected - 1 >= 0) {
        currentRobotIndexSelected--;
        console.log('current index: ', currentRobotIndexSelected);
        displayRobot(robots[currentRobotIndexSelected]);
        return;
    };
    currentRobotIndexSelected = robots.length - 1;
    console.log('current index: ', currentRobotIndexSelected);
    displayRobot(robots[robots.length - 1]);
    // showMessages();
};

function onClickNext(): void {
    if (currentRobotIndexSelected + 1 <= robots.length - 1) {
        currentRobotIndexSelected++;
        console.log('current index: ', currentRobotIndexSelected);
        displayRobot(robots[currentRobotIndexSelected]);
        return;
    };
    currentRobotIndexSelected = 0;
    console.log('current index: ', currentRobotIndexSelected);
    displayRobot(robots[0]);
    // showMessages();
};

function onShowCreatedRobots(e: any): void {
    resetTable();
    if (robots.length > 0) {
        (<HTMLElement>document.querySelector('#has-robot-counter')).innerHTML = `${robots.length} robots found`;
        (<HTMLElement>document.querySelector('.table')).style.visibility = 'visible';
        let table: HTMLTableElement = document.querySelector('.table');
        robots.forEach((robot: Robot) => {
            let tr: HTMLElement = document.createElement('tr');
            let nameTd: HTMLElement = document.createElement('td');
            let nameATag: HTMLAnchorElement = document.createElement('a');
            nameATag.innerText = robot.name;
            nameATag.href = '/robot.id';
            nameATag.onclick = (e: any) => onClickLinkRobot(e, robot.id);
            nameTd.appendChild(nameATag);
            let typeTd: HTMLElement = document.createElement('td');
            let colorTd: HTMLElement = document.createElement('td');
            let colorBox: HTMLDivElement = document.createElement('div');
            colorBox.id = 'robotColor';
            colorBox.style.backgroundColor = robot.color;
            colorTd.appendChild(colorBox);
            //<input type="color" id="head" name="head" value="#e96126"></input>
            let optionsTd: HTMLElement = document.createElement('td');
            const optionsArray: [] = [];
            Object.entries(robot.options).forEach(([key, value]) => {
                if (value) {
                    switch (key) {
                        case 'canJump':
                            optionsArray.push('can jump');
                            break;
                        case 'canTalk':
                            optionsArray.push('can talk');
                            break;
                        case 'canBlink':
                            optionsArray.push('can blink');
                            break;
                        default:
                            break;

                    }
                }
            });
            console.log(optionsArray)

            typeTd.innerText = robot.robotType;
            optionsTd.innerText = optionsArray.join(', ');
            tr.appendChild(nameTd);
            tr.appendChild(typeTd);
            tr.appendChild(colorTd);
            tr.appendChild(optionsTd);
            table.appendChild(tr);
        });
        showMessages();

        return;
    }

    document.querySelector('#has-robot-counter').innerHTML = 'No robots created yet';
    document.querySelector('.table').style.visibility = 'hidden';

    e.preventDefault();
};

function onClickLinkRobot(e, id) {
    console.log(id);
    console.log(robots);

    e.preventDefault();
    displayRobot(robots[id]);
    // showMessages();
};

function onClickSendMessage() {
    let message = document.getElementById("message-input").value;
    if (!message) {
        document.querySelector(".create-message label[name='error']").style.visibility = 'visible';
        return;
    }
    document.querySelector(".create-message label[name='error']").style.visibility = 'hidden';
    const currentTime = new Date();
    const timeWithPmAm = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    const currentRobotsIds = [];
    robots.forEach(robot => currentRobotsIds.push(robot.id));
    messages.push({
        currentRobotsIds,
        creatorId: currentRobotIndexSelected,
        message,
        time: timeWithPmAm
    });
    document.getElementById("message-input").value = '';
    showMessages();
};

function resetTable() {
    let table = document.querySelector('.table');
    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    };
};

function showMessages() {
    let messagesSelector = document.querySelector(".messages ul");
    messagesSelector.innerHTML = '';
    const messageReversed = [...messages];
    messageReversed.reverse();
    messageReversed.forEach(messageInfo => {
        if (messageInfo.currentRobotsIds.includes(currentRobotIndexSelected)) {
            console.log(' robots ids: ' + messageInfo.currentRobotsIds)
            console.log(' current index is : ' + currentRobotIndexSelected)
            const li = document.createElement("li");
            const firstParagraph = document.createElement("p");
            const secondParagraph = document.createElement("p");
            const robotName = document.createElement("span");
            robotName.innerText = robots[messageInfo.creatorId].name;
            robotName.style.color = robots[messageInfo.creatorId].color;

            firstParagraph.append(robotName);
            firstParagraph.append(' ' + messageInfo.time);
            secondParagraph.innerText = messageInfo.message;
            li.appendChild(firstParagraph);
            li.appendChild(secondParagraph);
            messagesSelector = document.querySelector(".messages ul");
            messagesSelector.appendChild(li);
        };
        // return;
    });
    // messages.reverse();

};

function checkForRobotInputErrors(name, robotType, color, phrase, options) {
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