function newGame() {
    let fifteenNumbers = [];
    let gameNumbers = document.getElementsByClassName("numbers");
    let currentNumber;
    let i = 0;
    while (fifteenNumbers.length < 15) {
        currentNumber = Math.floor(Math.random() * 15) + 1;
        if (!fifteenNumbers.includes(currentNumber)) {
            gameNumbers[i].innerHTML = currentNumber;
            i = i + 1;
            fifteenNumbers.push(currentNumber)
        }
    }
    gameNumbers[15].innerHTML = 0;
}

function moveByDoubleClick(event) {
    let currentValue = this.textContent;
    if (currentValue != 0){
    let currentId = this.id;
    let row = parseInt(currentId.charAt(2));
    let column = parseInt(currentId.charAt(3));
    let neighboringElements = [];
    neighboringElements.push([row,(column + 1)]);
    neighboringElements.push([row,(column - 1)]);
    neighboringElements.push([(row + 1),column]);
    neighboringElements.push([(row - 1),column]);
    let rearrangement = "false";
    for (let i = 0; i < 4; i++){ 
    
        if ((neighboringElements[i][0] < 5) && 
        (neighboringElements[i][0] > 0) && 
        (neighboringElements[i][1] < 5) && 
        (neighboringElements[i][1] > 0) && 
        (rearrangement == "false")){
            let neighboring = document.getElementById("id" + 
            neighboringElements[i][0] + neighboringElements[i][1]);
            let neighboringValue = neighboring.textContent;
            console.log(neighboringValue);
            console.log(neighboringValue == 0);
           console.log(parseInt(currentValue));
            
            if (neighboringValue == 0){
                
                neighboring.textContent = this.textContent;
                this.textContent = 0;
                rearrangement = "true";
            }    
          
        
        
           
       }
    }
    
    }
    }

    
    


newGame();

let doubleClickEvent = document.getElementsByClassName("numbers");
for (let i = 0; i < 15; i++) {
    doubleClickEvent[i].addEventListener('dblclick', moveByDoubleClick);
}