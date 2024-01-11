var buttonDragStart;
var buttonDragEnd;

// Function newGame() fills the playing field with numbers 
// from 0 to 15 in random order
function newGame() {
    let fifteenNumbers = [];
    let gameNumbers = document.getElementsByClassName("numbers");
    let currentNumber;
    let i = 0;
    while (fifteenNumbers.length < 16) {
        currentNumber = Math.floor(Math.random() * 16);
        if (!fifteenNumbers.includes(currentNumber)) {
            gameNumbers[i].innerHTML = currentNumber;
            i = i + 1;
            fifteenNumbers.push(currentNumber)
        }
    }
}

// Function moveByClick(event) is triggered by double-clicking the mouse or 
// touching on a mobile device. If the pressed key is adjacent to a key with value 0, 
// then the values ​​​​in the buttons change. After this, function GameOver() is called.
function moveByClick(event) {
    let currentValue = this.textContent;
    if (currentValue != 0) {
        let currentId = this.id;
        let row = parseInt(currentId.charAt(2));
        let column = parseInt(currentId.charAt(3));
        let neighboringElements = [];
        neighboringElements.push([row, (column + 1)]);
        neighboringElements.push([row, (column - 1)]);
        neighboringElements.push([(row + 1), column]);
        neighboringElements.push([(row - 1), column]);

        let rearrangement = "false";
        for (let i = 0; i < 4; i++) {

            if ((neighboringElements[i][0] < 5) &&
                (neighboringElements[i][0] > 0) &&
                (neighboringElements[i][1] < 5) &&
                (neighboringElements[i][1] > 0) &&
                (rearrangement == "false")) {
                let neighboring = document.getElementById("id" +
                    neighboringElements[i][0] + neighboringElements[i][1]);
                let neighboringValue = neighboring.textContent;

                if (neighboringValue == 0) {
                    neighboring.textContent = this.textContent;
                    this.textContent = 0;
                    rearrangement = "true";
                }
            }
        }
    }
    GameOver()
}

// The function moveDragStart(event) is called when you start dragging 
// an element with the mouse.
function moveDragStart(event) {
    delete buttonDragStart;
    buttonDragStart = this;
}

// Function moveDragEnd(event) is called when you finish dragging an element with the mouse. 
// If the second element contains 0, the elements are swapped. After this function GameOver() is called
function moveDragEnd(event) {
    delete buttonDragEnd;
    buttonDragEnd = this;
    if ((buttonDragStart !== buttonDragEnd) && (buttonDragEnd.textContent == 0)) {
        let rowStart = parseInt(buttonDragStart.id.charAt(2));
        let columnStart = parseInt(buttonDragStart.id.charAt(3));
        let rowEnd = parseInt(buttonDragEnd.id.charAt(2));
        let columnEnd = parseInt(buttonDragEnd.id.charAt(3));
        if ((Math.abs(rowStart - rowEnd) + Math.abs(columnStart - columnEnd)) == 1) {
            buttonDragEnd.innerHTML = buttonDragStart.innerHTML;
            buttonDragStart.innerHTML = 0;
        }
    }
    GameOver()
}

// Function GameOver() checks if the game is over. If yes, a message about this is displayed.
function GameOver() {
    let gameWin = true;
    let value = 1;
    if (gameWin == true) {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                console.log(document.getElementById("id" + i + j));
                console.log(document.getElementById("id" + i + j).textContent);
                console.log(value);
                console.log(parseInt(document.getElementById("id" + i + j).textContent) !== parseInt(value));
                if (value < 16) {
                    if (parseInt(document.getElementById("id" + i + j).textContent) !== parseInt(value)) {
                        gameWin = false;
                        break;
                    }
                }
                value = value + 1;
            }
            if (gameWin == false) {
                break
            }
        }
    }
    if (gameWin == true) {
        let playAgain = confirm("You won! Will you play again?");
        if (playAgain) { newGame() }
    }
}

document.querySelector('.numbers').clientWidth = document.querySelector('.main')/4;//For correct display in Safari

newGame();

let ClickEvent = document.getElementsByClassName("numbers");
for (let i = 0; i < 16; i++) {
    ClickEvent[i].addEventListener('dblclick', moveByClick);
    ClickEvent[i].addEventListener('mousedown', moveDragStart);
    ClickEvent[i].addEventListener('mouseup', moveDragEnd);
    ClickEvent[i].addEventListener('touchstart', moveByClick);
}