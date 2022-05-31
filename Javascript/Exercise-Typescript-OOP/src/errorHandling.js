export default function checkForRobotInputErrors(name, robotType, color, phrase, options) {
    let hasError = false;
    if (!name) {
        document.querySelector(".name label[name='error']").style.visibility = 'visible';
        hasError = true;
    }
    else {
        document.querySelector(".name label[name='error']").style.visibility = 'hidden';
    }
    if (!robotType) {
        document.querySelector(".select-type label[name='error']").style.visibility = 'visible';
        hasError = true;
    }
    else {
        document.querySelector(".select-type label[name='error']").style.visibility = 'hidden';
    }
    if (!color) {
        document.querySelector(".select-color label[name='error']").style.visibility = 'visible';
        hasError = true;
    }
    else {
        document.querySelector(".select-color label[name='error']").style.visibility = 'hidden';
    }
    if (!phrase && options.canTalk) {
        document.querySelector(".write-comment label[name='error']").style.visibility = 'visible';
        hasError = true;
    }
    else {
        document.querySelector(".write-comment label[name='error']").style.visibility = 'hidden';
    }
    if (!hasError) {
        return false;
    }
    return true;
}
;
//# sourceMappingURL=errorHandling.js.map