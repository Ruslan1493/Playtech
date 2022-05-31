// import { addRobotToLocalStorage, displayRobot, showMessages, currentRobotIndexSelected, robots } from './index.js';
// import checkForRobotInputErrors from './errorHandling.js';

// function onSubmit(e: any): void {
//     let options: Options = {
//         canJump: false,
//         canTalk: false,
//         canBlink: false,
//     };
//     let id: number;

//     let name: string = (<HTMLInputElement>document.querySelector(".name input")).value;
//     let robotTypeValue: string = (<HTMLInputElement>document.querySelector(".select-type select")).value;
//     let color: string = (<HTMLInputElement>document.querySelector(".select-color input")).value;
//     const robotType: RobotType = robotTypeValue === 'Male' ? RobotType.MALE : RobotType.FEMALE;
//     let checkboxElement: HTMLInputElement[] = Array.from(document.querySelectorAll(".checkbox-wrapper input"));

//     checkboxElement.forEach((input: HTMLInputElement, i: number) => {
//         const inputId = input.id as OptionsObjectKey;
//         input.checked ? options[inputId] = true : options[inputId] = false;
//     });

//     let phrase: string = (<HTMLInputElement>document.querySelector(".write-comment textarea")).value;
//     const hasError: boolean = checkForRobotInputErrors(name, robotTypeValue, color, phrase, options);
//     if (hasError) {
//         return;
//     };

//     if (robots.length > 0) {
//         console.log('last robot id = ', robots[robots.length - 1].id)
//         id = robots[robots.length - 1].id;
//         id++;
//     } else {
//         id = 0;
//     }
//     // console.log('id ', id)
//     // id = robots.length > 0 ? robots[robots.length - 1].id += 1 : 0;

//     // console.log('index of robot ', currentRobotIndexSelected)
//     robots.push({
//         name, robotType, color, phrase, options, id
//     });

//     addRobotToLocalStorage({
//         name, robotType, color, phrase, options, id
//     });

//     showSliderButtons(id);

//     displayRobot(robots[robots.length - 1]);



//     name = (<HTMLInputElement>document.querySelector(".name input")).value = '';
//     robotTypeValue = (<HTMLInputElement>document.querySelector(".select-type select")).value = '';
//     color = (<HTMLInputElement>document.querySelector(".select-color input")).value = '#F16527';
//     showMessages();
//     e.preventDefault();
// };


// function showSliderButtons(id: number): void {
//     if (robots.length > 1) {
//         currentRobotIndexSelected = id;
//         (<HTMLDivElement>document.querySelector(".slider-buttons")).style.display = 'block';
//     };
// }