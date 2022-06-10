import { Options } from './types.js';

export default function checkForRobotInputErrors(name: string, robotType: string, color: string, phrase: string, options: Options): boolean {
    let hasError: boolean = false;
    if (!name) {
        (<HTMLLabelElement>document.querySelector(".name label[name='error']")).style.visibility = 'visible';
        hasError = true;
    } else {
        (<HTMLLabelElement>document.querySelector(".name label[name='error']")).style.visibility = 'hidden';
    }

    if (!robotType) {
        (<HTMLLabelElement>document.querySelector(".select-type label[name='error']")).style.visibility = 'visible';
        hasError = true;
    } else {
        (<HTMLLabelElement>document.querySelector(".select-type label[name='error']")).style.visibility = 'hidden';
    }

    if (!color) {
        (<HTMLLabelElement>document.querySelector(".select-color label[name='error']")).style.visibility = 'visible';
        hasError = true;
    } else {
        (<HTMLLabelElement>document.querySelector(".select-color label[name='error']")).style.visibility = 'hidden';
    }

    if (!phrase && options.canTalk) {
        (<HTMLLabelElement>document.querySelector(".write-comment label[name='error']")).style.visibility = 'visible';
        hasError = true;
    } else {
        (<HTMLLabelElement>document.querySelector(".write-comment label[name='error']")).style.visibility = 'hidden';
    }

    if (!hasError) {
        return false;
    }
    return true;
};