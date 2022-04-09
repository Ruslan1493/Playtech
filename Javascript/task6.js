//Напишете скрипт, който да показва всички числа от редицата на Фибоначи. 
//Числата трявба да са лимитирани и да не надминават стойност от 500. За целта използвайте “while”!

let fibArray = [];
fibArray[0] = 0;
fibArray[1] = 1;
let i = 2;

while(fibArray[fibArray.length - 1] < 500){
    let x = fibArray[fibArray.length - 2];
    let y = fibArray[fibArray.length - 1];

    i = x + y;
    if(i > 500){
        break;
    }
    fibArray.push(i);
};

console.log(fibArray);