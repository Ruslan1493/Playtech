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

    console.log(hasError);
    console.log(robotType);
    console.log(color);
    console.log(options);
    console.log(phrase);

    e.preventDefault();
};

function onChangeCanTalkInput(){
    let canTalksInput = document.querySelector(".checkbox-wrapper input[id='canTalk']").checked;
    if(!canTalksInput){
        return document.querySelector(".write-comment textarea").disabled = true;
    }
    return document.querySelector(".write-comment textarea").disabled = false;
};

function checkForInputErrors(name, robotType, color, phrase){
    let hasError = false;
    if(!name){
        document.querySelector(".name label[name='error']").style.visibility = 'visible';
        hasError = true;
    }else{
        document.querySelector(".name label[name='error']").style.visibility = 'hidden';
    }
    
    if(!robotType){
        document.querySelector(".select-type label[name='error']").style.visibility = 'visible';
        hasError = true;
    }else{
        document.querySelector(".select-type label[name='error']").style.visibility = 'hidden';
    }

    if(!color){
        document.querySelector(".select-color label[name='error']").style.visibility = 'visible';
        hasError = true;
    }else{
        document.querySelector(".select-color label[name='error']").style.visibility = 'hidden';
    }

    if(!phrase && options.canTalk){
        document.querySelector(".write-comment label[name='error']").style.visibility = 'visible';
        hasError = true;
    }else{
        document.querySelector(".write-comment label[name='error']").style.visibility = 'hidden';
    }

    if(!hasError){
        return false;
    }
    return true;
};