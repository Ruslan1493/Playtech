import { RobotType } from './types.js';
import checkForRobotInputErrors from './errorHandling.js';
import Robot from './RobotModel.js';
import ChatManager from './MessageModel.js';
let showTalkAnimation;
function checkForRobots() {
    if (localStorage.getItem('robots')) {
        Robot.replaceCurrentRobots(JSON.parse(localStorage.getItem('robots')));
        displayRobot(Robot.getRobots()[0]);
        showSliderButtons(0);
        document.querySelector(".clearLocalStorageBtn").style.display = 'inline-block';
        return;
    }
    ;
    document.querySelector(".clearLocalStorageBtn").style.display = 'none';
}
;
function onSubmit(e) {
    let options = {
        canJump: false,
        canTalk: false,
        canBlink: false,
    };
    let id;
    let name = document.querySelector(".name input").value;
    let robotTypeValue = document.querySelector(".select-type select").value;
    let color = document.querySelector(".select-color input").value;
    const robotType = robotTypeValue === 'Male' ? RobotType.MALE : RobotType.FEMALE;
    let checkboxElement = Array.from(document.querySelectorAll(".checkbox-wrapper input"));
    console.log(name);
    checkboxElement.forEach((input, i) => {
        const inputId = input.id;
        input.checked ? options[inputId] = true : options[inputId] = false;
    });
    let phrase = document.querySelector(".write-comment textarea").value;
    const hasError = checkForRobotInputErrors(name, robotTypeValue, color, phrase, options);
    if (hasError) {
        return;
    }
    ;
    if (Robot.getRobots().length > 0) {
        console.log('last robot id = ', Robot.getRobots()[Robot.getRobots().length - 1].id);
        id = Robot.getRobots()[Robot.getRobots().length - 1].id;
        id++;
    }
    else {
        id = 0;
    }
    // console.log('id ', id)
    // id = robots.length > 0 ? robots[robots.length - 1].id += 1 : 0;
    // console.log('index of robot ', currentRobotIndexSelected)
    Robot.addRobot({
        name, robotType, color, phrase, options, id
    });
    addRobotToLocalStorage({
        name, robotType, color, phrase, options, id
    });
    showSliderButtons(id);
    displayRobot(Robot.getRobots()[Robot.getRobots().length - 1]);
    name = document.querySelector(".name input").value = '';
    robotTypeValue = document.querySelector(".select-type select").value = '';
    color = document.querySelector(".select-color input").value = '#F16527';
    showMessages();
    e.preventDefault();
}
;
function showSliderButtons(id) {
    if (Robot.getRobots().length > 1) {
        Robot.setCurrentRobotIndexSelected(id);
        document.querySelector(".slider-buttons").style.display = 'block';
    }
    ;
}
function addRobotToLocalStorage(robot) {
    if (!localStorage.getItem('robots')) {
        localStorage.setItem('robots', JSON.stringify([robot]));
        return;
    }
    ;
    let localStorageRobots = JSON.parse(localStorage.getItem('robots'));
    localStorageRobots.push(robot);
    localStorage.setItem('robots', JSON.stringify(localStorageRobots));
    console.log('Robots ', localStorageRobots);
}
;
function onChangeCanTalkInput(e) {
    let canTalksInput = document.querySelector(".checkbox-wrapper input[id='canTalk']").checked;
    if (!canTalksInput) {
        document.querySelector(".write-comment textarea").value = '';
        return document.querySelector(".write-comment textarea").disabled = true;
    }
    return document.querySelector(".write-comment textarea").disabled = false;
}
;
function displayRobot(robot) {
    console.log(robot);
    showMessages();
    document.querySelector("#slide-1").style.display = 'block';
    document.querySelector(".robot-name").innerHTML = robot.name;
    if (robot.robotType == 'Male') {
        document.querySelector(".factory-header").innerHTML = 'Male Robot';
        document.querySelector(".rock").style.display = 'none';
    }
    else {
        document.querySelector(".factory-header").innerHTML = 'Female Robot';
        document.querySelector(".rock").style.display = 'block';
        document.querySelector(".rock").style.borderBottom = `41px solid ${robot.color}`;
    }
    document.querySelector("#robot-body").style.borderTop = `85px solid ${robot.color}`;
    document.querySelector(".clearLocalStorageBtn").style.display = 'inline-block';
    displayCanBlink(robot.options.canBlink);
    displayCanJump(robot.options.canJump);
    displayCanTalk(robot.options.canTalk, robot.phrase);
    return;
}
;
function displayCanJump(canJump) {
    const robotLegs = Array.from(document.querySelectorAll('.legs'));
    if (canJump) {
        robotLegs.forEach((el) => {
            el.style.animation = 'robotJump ease-out 2s infinite';
        });
        return;
    }
    robotLegs.forEach((el) => {
        el.style.animation = '';
    });
}
;
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
    }
    else {
        document.querySelector('.robot-bubble').style.display = 'none';
        document.querySelector('#robot-mouth').style.animation = '';
    }
}
;
function displayCanBlink(canBlink) {
    if (canBlink) {
        document.querySelector('.robot-eyes').style.animation = 'robotBlink ease-in-out 2s infinite';
    }
    else {
        document.querySelector('.robot-eyes').style.animation = '';
    }
}
;
function onClickPrevious() {
    if (Robot.getCurrentRobotIndexSelected() - 1 >= 0) {
        Robot.setCurrentRobotIndexSelected(Robot.getCurrentRobotIndexSelected() - 1);
        console.log('current index: ', Robot.getCurrentRobotIndexSelected());
        displayRobot(Robot.getRobots()[Robot.getCurrentRobotIndexSelected()]);
        return;
    }
    ;
    Robot.setCurrentRobotIndexSelected(Robot.getRobots().length - 1);
    console.log('current index: ', Robot.getCurrentRobotIndexSelected());
    displayRobot(Robot.getRobots()[Robot.getRobots().length - 1]);
}
;
function onClickNext() {
    if (Robot.getCurrentRobotIndexSelected() + 1 <= Robot.getRobots().length - 1) {
        Robot.setCurrentRobotIndexSelected(Robot.getCurrentRobotIndexSelected() + 1);
        console.log('current index: ', Robot.getCurrentRobotIndexSelected());
        displayRobot(Robot.getRobots()[Robot.getCurrentRobotIndexSelected()]);
        return;
    }
    ;
    Robot.setCurrentRobotIndexSelected(0);
    console.log('current index: ', Robot.getCurrentRobotIndexSelected());
    displayRobot(Robot.getRobots()[0]);
}
;
function onShowCreatedRobots(e) {
    resetTable();
    if (Robot.getRobots().length > 0) {
        document.querySelector('#has-robot-counter').innerHTML = `${Robot.getRobots().length} robots found`;
        document.querySelector('.table').style.visibility = 'visible';
        let table = document.querySelector('.table');
        Robot.getRobots().forEach((robot) => {
            let tr = document.createElement('tr');
            let nameTd = document.createElement('td');
            let nameATag = document.createElement('a');
            nameATag.innerText = robot.name;
            nameATag.href = '/robot.id';
            nameATag.onclick = (e) => onClickLinkRobot(e, robot.id);
            nameTd.appendChild(nameATag);
            let typeTd = document.createElement('td');
            let colorTd = document.createElement('td');
            let colorBox = document.createElement('div');
            colorBox.id = 'robotColor';
            colorBox.style.backgroundColor = robot.color;
            colorTd.appendChild(colorBox);
            let optionsTd = document.createElement('td');
            const optionsArray = [];
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
            console.log(optionsArray);
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
}
;
function onClickLinkRobot(e, id) {
    console.log(id);
    console.log(Robot.getRobots());
    e.preventDefault();
    displayRobot(Robot.getRobots()[id]);
}
;
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
    Robot.getRobots().forEach((robot) => currentRobotsIds.push(robot.id));
    if (localStorage.getItem('messages')) {
        const localStorageMessages = JSON.parse(localStorage.getItem('messages'));
        ChatManager.replaceCurrentMessages(localStorageMessages);
    }
    ChatManager.addMessage({
        currentRobotsIds,
        creatorId: Robot.getCurrentRobotIndexSelected(),
        message,
        time: timeWithPmAm,
        id: ChatManager.getIdAndIncreaseIt()
    });
    localStorage.setItem('messages', JSON.stringify(ChatManager.getMessages()));
    document.getElementById("message-input").value = '';
    showMessages();
}
;
function onClearLocalStorage(e) {
    e.preventDefault();
    Robot.clearRobots();
    ChatManager.clearMessages();
    localStorage.removeItem('robots');
    localStorage.removeItem('messages');
    document.querySelector("#slide-1").style.display = 'none';
    document.querySelector(".clearLocalStorageBtn").style.display = 'none';
    document.querySelector(".slider-buttons").style.display = 'none';
    document.querySelector('.table').style.visibility = 'hidden';
    document.querySelector('#has-robot-counter').innerHTML = 'No robots created yet';
}
;
function onReverseMessagesOrder() {
    if (!localStorage.getItem('showNewMessagesOrder')) {
        localStorage.setItem('showNewMessagesOrder', 'true');
    }
    if (localStorage.getItem('showNewMessagesOrder') === 'true') {
        document.querySelector("#reverseMessagesOrderBtn").innerText = 'Show newest messages';
        localStorage.setItem('showNewMessagesOrder', 'false');
        ChatManager.orderMessagesByNewest(false);
    }
    else {
        document.querySelector("#reverseMessagesOrderBtn").innerText = 'Show oldest messages';
        localStorage.setItem('showNewMessagesOrder', 'true');
        ChatManager.orderMessagesByNewest(true);
    }
    localStorage.setItem('messages', JSON.stringify(ChatManager.getMessages()));
    showMessages();
}
;
function resetTable() {
    let table = document.querySelector(".table");
    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }
    ;
}
;
function showMessages() {
    document.querySelector(".messages > p").style.display = 'none';
    let messagesSelector = document.querySelector(".messages ul");
    messagesSelector.innerHTML = '';
    if (localStorage.getItem('messages')) {
        const localStorageMessages = JSON.parse(localStorage.getItem('messages'));
        ChatManager.replaceCurrentMessages(localStorageMessages);
        const messageReversed = [...ChatManager.getMessages()];
        console.log('messageReversed ', messageReversed);
        // if (!localStorage.getItem('showNewMessagesOrder')) {
        //     console.log('in check for showNewMessagesOrder');
        //     messageReversed.reverse();
        // }
        messageReversed.forEach((messageInfo) => {
            if (messageInfo.currentRobotsIds.includes(Robot.getCurrentRobotIndexSelected())) {
                document.querySelector(".messages > p").style.display = 'block';
                console.log(' robots ids: ' + messageInfo.currentRobotsIds);
                console.log(' current index is : ' + Robot.getCurrentRobotIndexSelected());
                const li = document.createElement("li");
                const firstParagraph = document.createElement("p");
                const secondParagraph = document.createElement("p");
                const robotName = document.createElement("span");
                robotName.innerText = Robot.getRobots()[messageInfo.creatorId].name;
                robotName.style.color = Robot.getRobots()[messageInfo.creatorId].color;
                firstParagraph.append(robotName);
                firstParagraph.append(' ' + messageInfo.time);
                secondParagraph.innerText = messageInfo.message;
                li.appendChild(firstParagraph);
                li.appendChild(secondParagraph);
                messagesSelector = document.querySelector(".messages ul");
                messagesSelector.appendChild(li);
            }
            ;
        });
    }
    ;
}
;
checkForRobots();
showMessages();
//onclick=onClickSendMessage()
document.querySelector("#sendMessageBtn").addEventListener('click', onClickSendMessage);
// onclick=onClickPrevious()
document.querySelector("#previous").addEventListener('click', onClickPrevious);
// onclick=onClickNext()
document.querySelector("#next").addEventListener('click', onClickNext);
// onclick=onSubmit(event)
document.querySelector("#onSubmitBtn").addEventListener('click', onSubmit);
// onclick=onShowCreatedRobots(event)
document.querySelector("#showCreatedRobotsBtn").addEventListener('click', onShowCreatedRobots);
// onclick=onClearLocalStorage(event)
document.querySelector(".clearLocalStorageBtn").addEventListener('click', onClearLocalStorage);
// onchange=onChangeCanTalkInput() 
document.querySelector("#canTalk").addEventListener('check', onChangeCanTalkInput);
//onclick=reverseMessagesOrderBtn()
document.querySelector("#reverseMessagesOrderBtn").addEventListener('click', onReverseMessagesOrder);
export { addRobotToLocalStorage, displayRobot, showMessages };
//# sourceMappingURL=index.js.map