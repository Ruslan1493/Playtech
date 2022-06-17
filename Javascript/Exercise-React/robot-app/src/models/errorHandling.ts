import { Options, IErrors } from '../interfaces/types.js';

export default function checkForRobotInputErrors(name: string, color: string, phrase: string, options: Options): { hasError: boolean, errors: IErrors } {
    let hasError: boolean = false;
    const errors: IErrors = {
        'name': 'hidden',
        'select-color': 'hidden',
        'write-comment': 'hidden',
    }

    if (!name) {
        errors['name'] = 'visible';
        hasError = true;
    }

    if (!color) {
        errors['select-color'] = 'visible';
        hasError = true;
    }

    if (!phrase && options.canTalk) {
        errors['write-comment'] = 'visible';
        hasError = true;
    }

    return { hasError, errors };
};