
// Validate academite functions are available
const functions = ["takeTurn", "getBoard","checkWinner",   "resetGame"];
for (f of functions) {
    const functionObject = window[f];
    if (typeof functionObject !== "function") {
        throw `Looks like expected function '${f}' is missing. Double check the function signatures from academy.js are still present and unaltered.`;
    }
}

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) {
    clearBoard();
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            const cellText = board[rowIndex][columnIndex] === "yellow" ? "🟡" : "🔴";
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText;
        }
    }
}

function isValidRowOrColumn(array) {
    return Array.isArray(array);
}

function isValidColumn(columnArray) {
    return isValidRowOrColumn(columnArray) && columnArray.every(function (item) { return ["yellow", "red", null].includes(item); });
}

// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) {
    takeTurn(rowIndex, columnIndex);
    const board = getBoard();
    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'yellow' or 'red'. Actually received: " + JSON.stringify(board);
    }
    drawBoard(board);
    const winner = checkWinner();
    const playerOneName = document.getElementById("hidden-player").innerText
    const playerTwoName = document.getElementById("hidden-player2").innerText

    if (winner) {
        if (typeof winner !== "string" || ![playerTwoName, playerOneName, "nobody",].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'Player 2', 'Player 1' or 'nobody'. Actually received: " + winner;
        }
        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = winner;
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "block";
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard();
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// const btn = document.getElementById("btn")
// btn.addEventListener("click",playerOneClick)
// btn.addEventListener("click", showBoard)

// const btn2 = document.getElementById("btn2")
// btn2.addEventListener("click", playerTwoClick)
// btn2.addEventListener("click", showBoard)

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);



if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        clearBoard,
        drawBoard,
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
        resetClick,
    }
} else {
    console.log("Running in Browser")
}
