function newGame(){
    let fifteenNumbers =[];
    let gameNumbers =  document.getElementsByClassName("numbers");
    let currentNumber;
    let i = 0;
    while (fifteenNumbers.length < 15){
        currentNumber = Math.floor(Math.random()*15)+1;
        if (!fifteenNumbers.includes(currentNumber)){
            gameNumbers[i].innerHTML=currentNumber;
        i = i + 1;
        fifteenNumbers.push(currentNumber)
    }
    }
}