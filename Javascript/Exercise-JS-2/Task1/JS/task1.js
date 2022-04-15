let options = {
    'canJump': false,
    'canTalk': false,
    'canBlink': false,
}

function onSubmit(e) {
    let name = document.querySelector("div.name input").value;
    let robotType = document.querySelector("div.select-type select").value;
    let color = document.querySelector("div.select-color input").value;
    // let options = {
    //     'canJump': false,
    //     'canTalk': false,
    //     'canBlink': false,
    // }
    document.querySelectorAll(".checkbox-wrapper input").forEach(input => {
        input.checked ? options[input.id] = true : options[input.id] = false;
    });

    let phrase = document.querySelector("div.write-comment textarea").value;
    console.log(name);
    console.log(robotType);
    console.log(color);
    console.log(options);
    console.log(phrase);

    e.preventDefault();
}

function onChangeCanTalkInput(){
    let canTalksInput = document.querySelector(".checkbox-wrapper input[id='canTalk']").checked;
    if(!canTalksInput){
        return document.querySelector("div.write-comment textarea").disabled = true;
    }
    return document.querySelector("div.write-comment textarea").disabled = false;
}