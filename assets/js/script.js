var buttonDragStart;
var buttonDragEnd;

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
}

function moveDragStart(event) {
    delete buttonDragStart;
    buttonDragStart = this;
}

function moveDragEnd(event) {
    delete buttonDragEnd;
    buttonDragEnd = this;
    // console.log(buttonDragStart);
    // console.log(buttonDragEnd);
    if ((buttonDragStart !== buttonDragEnd) && (buttonDragEnd.textContent == 0)) {
        let rowStart = parseInt(buttonDragStart.id.charAt(2));
        let columnStart = parseInt(buttonDragStart.id.charAt(3));
        let rowEnd = parseInt(buttonDragEnd.id.charAt(2));
        let columnEnd = parseInt(buttonDragEnd.id.charAt(3));
        if ((Math.abs(rowStart - rowEnd) + Math.abs(columnStart - columnEnd)) == 1) {
            buttonDragEnd.textContent = buttonDragStart.textContent;
            buttonDragStart.textContent = 0
        }
    }
}

newGame();

let ClickEvent = document.getElementsByClassName("numbers");
for (let i = 0; i < 16; i++) {
    ClickEvent[i].addEventListener('dblclick', moveByDoubleClick);
    //ClickEvent[i].addEventListener('ondragstart', moveDragStart);
    //ClickEvent[i].addEventListener('dragend', moveDragEnd);
    ClickEvent[i].addEventListener('mousedown', moveDragStart);
    ClickEvent[i].addEventListener('mouseup', moveDragEnd);
}