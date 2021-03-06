import { IRobot, OptionsObjectKey, Options, IMessage, RobotType } from './types.js';
import checkForRobotInputErrors from './errorHandling.js';
import RobotManager from './RobotManager.js';
import ChatManager from './MessageManager';

let showTalkAnimation: any;

const robots: RobotManager = new RobotManager();
const messages: ChatManager = new ChatManager();


function checkForRobots(): void {
    if (robots.getRobots().length > 0) {
        displayRobot(robots.getRobots()[0]);
        showSliderButtons(0);
        (<HTMLElement>document.querySelector(".clearLocalStorageBtn")).style.display = 'inline-block';
        return;
    };
    (<HTMLElement>document.querySelector(".clearLocalStorageBtn")).style.display = 'none';

};

function onSubmit(e: any): void {
    let options: Options = {
        canJump: false,
        canTalk: false,
        canBlink: false,
    };
    let id: number;

    let name: string = (<HTMLInputElement>document.querySelector(".name input")).value;
    let robotTypeValue: string = (<HTMLInputElement>document.querySelector(".select-type select")).value;
    let color: string = (<HTMLInputElement>document.querySelector(".select-color input")).value;
    const robotType: RobotType = robotTypeValue === 'Male' ? RobotType.MALE : RobotType.FEMALE;
    let checkboxElement: HTMLInputElement[] = Array.from(document.querySelectorAll(".checkbox-wrapper input"));
    console.log(name);

    checkboxElement.forEach((input: HTMLInputElement, i: number) => {
        const inputId = input.id as OptionsObjectKey;
        input.checked ? options[inputId] = true : options[inputId] = false;
    });

    let phrase: string = (<HTMLInputElement>document.querySelector(".write-comment textarea")).value;
    const hasError: boolean = checkForRobotInputErrors(name, robotTypeValue, color, phrase, options);
    if (hasError) {
        return;
    };

    if (robots.getRobots().length > 0) {
        console.log('last robot id = ', robots.getRobots()[robots.getRobots().length - 1].id)
        id = robots.getRobots()[robots.getRobots().length - 1].id;
        id++;
    } else {
        id = 0;
    }
    // console.log('id ', id)
    // id = robots.length > 0 ? robots[robots.length - 1].id += 1 : 0;

    // console.log('index of robot ', currentRobotIndexSelected)
    robots.addRobot({
        name, robotType, color, phrase, options, id
    });

    robots.addRobotToLocalStorage({
        name, robotType, color, phrase, options, id
    });

    showSliderButtons(id);

    displayRobot(robots.getRobots()[robots.getRobots().length - 1]);


    name = (<HTMLInputElement>document.querySelector(".name input")).value = '';
    robotTypeValue = (<HTMLInputElement>document.querySelector(".select-type select")).value = '';
    color = (<HTMLInputElement>document.querySelector(".select-color input")).value = '#F16527';
    showMessages();
    e.preventDefault();
};


function showSliderButtons(id: number): void {
    if (robots.getRobots().length > 1) {
        robots.setCurrentRobotIndexSelected(id);
        (<HTMLDivElement>document.querySelector(".slider-buttons")).style.display = 'block';
    };
}

function onChangeCanTalkInput(e: any): boolean {
    let canTalksInput: boolean = (<HTMLInputElement>document.querySelector(".checkbox-wrapper input[id='canTalk']")).checked;
    if (!canTalksInput) {
        (<HTMLInputElement>document.querySelector(".write-comment textarea")).value = '';
        return (<HTMLInputElement>document.querySelector(".write-comment textarea")).disabled = true;
    }
    return (<HTMLInputElement>document.querySelector(".write-comment textarea")).disabled = false;
};

function displayRobot(robot: IRobot): void {
    console.log(robot)
    showMessages();

    (<HTMLElement>document.querySelector("#slide-1")).style.display = 'block';
    (<HTMLElement>document.querySelector(".robot-name")).innerHTML = robot.name;
    if (robot.robotType == 'Male') {
        (<HTMLElement>document.querySelector(".factory-header")).innerHTML = 'Male robots';

        (<HTMLElement>document.querySelector(".rock")).style.display = 'none';
    } else {
        (<HTMLElement>document.querySelector(".factory-header")).innerHTML = 'Female robots';

        (<HTMLElement>document.querySelector(".rock")).style.display = 'block';
        (<HTMLElement>document.querySelector(".rock")).style.borderBottom = `41px solid ${robot.color}`;
    }
    (<HTMLElement>document.querySelector("#robot-body")).style.borderTop = `85px solid ${robot.color}`;
    (<HTMLElement>document.querySelector(".clearLocalStorageBtn")).style.display = 'inline-block';
    displayCanBlink(robot.options.canBlink);
    displayCanJump(robot.options.canJump);
    displayCanTalk(robot.options.canTalk, robot.phrase);
    return;
};

function displayCanJump(canJump: boolean): void {
    const robotLegs: HTMLElement[] | null = Array.from(document.querySelectorAll('.legs'));
    if (canJump) {
        robotLegs.forEach((el: HTMLElement) => {
            el.style.animation = 'robotJump ease-out 2s infinite';
        });
        return;
    }
    robotLegs.forEach((el: HTMLElement) => {
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
    if (robots.getCurrentRobotIndexSelected() - 1 >= 0) {
        robots.setCurrentRobotIndexSelected(robots.getCurrentRobotIndexSelected() - 1);
        console.log('current index: ', robots.getCurrentRobotIndexSelected());
        displayRobot(robots.getRobots()[robots.getCurrentRobotIndexSelected()]);
        return;
    };
    robots.setCurrentRobotIndexSelected(robots.getRobots().length - 1);
    console.log('current index: ', robots.getCurrentRobotIndexSelected());
    displayRobot(robots.getRobots()[robots.getRobots().length - 1]);
};

function onClickNext(): void {
    if (robots.getCurrentRobotIndexSelected() + 1 <= robots.getRobots().length - 1) {
        robots.setCurrentRobotIndexSelected(robots.getCurrentRobotIndexSelected() + 1);
        console.log('current index: ', robots.getCurrentRobotIndexSelected());
        displayRobot(robots.getRobots()[robots.getCurrentRobotIndexSelected()]);
        return;
    };
    robots.setCurrentRobotIndexSelected(0);
    console.log('current index: ', robots.getCurrentRobotIndexSelected());
    displayRobot(robots.getRobots()[0]);
};

function onShowCreatedRobots(e: Event): void {
    resetTable();
    if (robots.getRobots().length > 0) {

        (<HTMLElement>document.querySelector('#has-robot-counter')).innerHTML = `${robots.getRobots().length} robots found`;

        (<HTMLElement>document.querySelector('.table')).style.visibility = 'visible';
        let table: HTMLTableElement = <HTMLTableElement>document.querySelector('.table');
        robots.getRobots().forEach((robot: IRobot) => {

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
            let optionsTd: HTMLElement = document.createElement('td');
            const optionsArray: string[] = [];
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

    (<HTMLElement>document.querySelector('#has-robot-counter')).innerHTML = 'No robots created yet';
    (<HTMLTableElement>document.querySelector('.table')).style.visibility = 'hidden';

    e.preventDefault();
};

function onClickLinkRobot(e: Event, id: number): void {
    console.log(id);
    console.log(robots.getRobots());

    e.preventDefault();
    displayRobot(robots.getRobots()[id]);

};

function onClickSendMessage(): void {
    let message: string = (<HTMLInputElement>document.getElementById("message-input")).value;
    if (!message) {
        (<HTMLElement>document.querySelector(".create-message label[name='error']")).style.visibility = 'visible';
        return;
    }
    (<HTMLElement>document.querySelector(".create-message label[name='error']")).style.visibility = 'hidden';
    const currentTime: Date = new Date();
    console.log('currentTime ', currentTime);

    // const timeWithPmAm: string = currentTime.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });
    const currentRobotsIds: number[] = [];
    robots.getRobots().forEach((robot: IRobot) => currentRobotsIds.push(robot.id));

    if (localStorage.getItem('messages')) {
        messages.replaceCurrentMessages();
    }
    messages.addMessage({
        currentRobotsIds,
        creatorId: robots.getCurrentRobotIndexSelected(),

        message,
        time: currentTime,
        id: messages.getIdAndIncreaseIt()
    });
    localStorage.setItem('messages', JSON.stringify(messages.getMessages()));

    (<HTMLInputElement>document.getElementById("message-input")).value = '';
    showMessages();
};

function onClearLocalStorage(e: Event): void {
    e.preventDefault();
    robots.clearRobots();

    messages.clearMessages();
    localStorage.removeItem('robots');
    localStorage.removeItem('messages');
    (<HTMLElement>document.querySelector("#slide-1")).style.display = 'none';
    (<HTMLElement>document.querySelector(".clearLocalStorageBtn")).style.display = 'none';
    (<HTMLDivElement>document.querySelector(".slider-buttons")).style.display = 'none';
    (<HTMLElement>document.querySelector('.table')).style.visibility = 'hidden';
    (<HTMLElement>document.querySelector('#has-robot-counter')).innerHTML = 'No robots created yet';
};

function onReverseMessagesOrder(): void {
    if (!localStorage.getItem('showNewMessagesOrder')) {
        localStorage.setItem('showNewMessagesOrder', 'true');
    }
    if (localStorage.getItem('showNewMessagesOrder') === 'true') {
        (<HTMLButtonElement>document.querySelector("#reverseMessagesOrderBtn")).innerText = 'Show newest messages';
        localStorage.setItem('showNewMessagesOrder', 'false');
        messages.orderMessagesByNewest(false);
    } else {
        (<HTMLButtonElement>document.querySelector("#reverseMessagesOrderBtn")).innerText = 'Show oldest messages';
        localStorage.setItem('showNewMessagesOrder', 'true');
        messages.orderMessagesByNewest(true);
    }


    localStorage.setItem('messages', JSON.stringify(messages.getMessages()));
    showMessages();
};

function resetTable(): void {
    let table: HTMLTableElement = <HTMLTableElement>document.querySelector(".table");
    while (table.children.length > 1) {
        table.removeChild(<ChildNode>table.lastChild);
    };
};

function showMessages(): void {
    (<HTMLUListElement>document.querySelector(".messages > p")).style.display = 'none';
    let messagesSelector: HTMLUListElement = (<HTMLUListElement>document.querySelector(".messages ul"));
    messagesSelector.innerHTML = '';
    if (localStorage.getItem('messages')) {

        messages.replaceCurrentMessages();
        const messageReversed: IMessage[] = [...messages.getMessages()];
        console.log('messageReversed ', messageReversed);

        messageReversed.forEach((messageInfo: IMessage) => {
            if (messageInfo.currentRobotsIds.includes(robots.getCurrentRobotIndexSelected())) {

                let dateNow: any = new Date();
                let currentMsgDate: any = new Date(messageInfo.time);
                let diff: number = Math.floor((dateNow - currentMsgDate) / 1000);
                let minutes = Math.floor(diff / 60);
                let hoursDifference = Math.floor(minutes / 60);
                if (hoursDifference > 5) {
                    return;
                }

                (<HTMLUListElement>document.querySelector(".messages > p")).style.display = 'block';

                console.log(' robots ids: ' + messageInfo.currentRobotsIds)
                console.log(' current index is : ' + robots.getCurrentRobotIndexSelected())

                const li: HTMLLIElement = document.createElement("li");
                const firstParagraph: HTMLParagraphElement = document.createElement("p");
                const secondParagraph: HTMLParagraphElement = document.createElement("p");
                const robotName: HTMLSpanElement = document.createElement("span");
                robotName.innerText = robots.getRobots()[messageInfo.creatorId].name;

                robotName.style.color = robots.getRobots()[messageInfo.creatorId].color;


                firstParagraph.append(robotName);
                firstParagraph.append(' ' + messages.getTimeInHoursPM(messageInfo));
                secondParagraph.innerText = messageInfo.message;
                li.appendChild(firstParagraph);
                li.appendChild(secondParagraph);
                messagesSelector = (<HTMLUListElement>document.querySelector(".messages ul"));
                messagesSelector.appendChild(li);
            };
        })
    };
};




checkForRobots();

//onclick=onClickSendMessage()
(<HTMLButtonElement>document.querySelector("#sendMessageBtn")).addEventListener('click', onClickSendMessage);
// onclick=onClickPrevious()
(<HTMLButtonElement>document.querySelector("#previous")).addEventListener('click', onClickPrevious);
// onclick=onClickNext()
(<HTMLButtonElement>document.querySelector("#next")).addEventListener('click', onClickNext);
// onclick=onSubmit(event)
(<HTMLButtonElement>document.querySelector("#onSubmitBtn")).addEventListener('click', onSubmit);
// onclick=onShowCreatedRobots(event)
(<HTMLButtonElement>document.querySelector("#showCreatedRobotsBtn")).addEventListener('click', onShowCreatedRobots);
// onclick=onClearLocalStorage(event)
(<HTMLButtonElement>document.querySelector(".clearLocalStorageBtn")).addEventListener('click', onClearLocalStorage);
// onchange=onChangeCanTalkInput() 
(<HTMLButtonElement>document.querySelector("#canTalk")).addEventListener('check', onChangeCanTalkInput);
//onclick=reverseMessagesOrderBtn()
(<HTMLButtonElement>document.querySelector("#reverseMessagesOrderBtn")).addEventListener('click', onReverseMessagesOrder);

export { displayRobot, showMessages };



