// Make your changes to store and update game state in this file

// Creates board and set hadGo to true and winner to false
let board = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], 
[null, null, null, null, null, null, null], [null, null, null, null, null, null, null]]

// Test for nobody wins
// let board = [
//     ["yellow", "red", "red", "yellow", "yellow", "red", null],
//     ["red", "yellow", "yellow", "red", "red", "yellow", "red"], 
//     ["yellow", "red", "red", "yellow", "yellow", "red", "yellow"], 
//     ["red", "yellow", "yellow", "red", "red", "yellow", "red"], 
//     ["yellow", "red", "red", "yellow", "yellow", "red", "yellow"],
//     ["red", "yellow", "yellow", "red", "red", "yellow", "red"]
// ]

let hadGo = true
let winner = false

// Creates an object for two possible ways of winning
const possibleWins = {
    redsWin: ["red", "red", "red", "red"], 
    yellowsWin: ["yellow", "yellow", "yellow", "yellow"]
}

// Function that creates an array of arrays. 4 arrays are created per row by grabbing 4 elements after the 0,1,2,3 element. Total amount is 6*6 == 24 arrays
function acrossGrab() {
    let grabArray = []

    for(let j = 0; j < board.length; j++) {
        
        grabArray.push(board[j].map(element => element).splice(0,4))
        grabArray.push(board[j].map(element => element).splice(1,4))
        grabArray.push(board[j].map(element => element).splice(2,4))
        grabArray.push(board[j].map(element => element).splice(3,4))
    }
    return grabArray 
    
}

// Function that creates an array of arrays. 3 arrays are created per column by grabbing 4 elements after the 0,1,2, element. Total amount is 7*3 == 21 arrays
function downGrab() {
    let grabArray = []

    for(let j = 0; j < board[0].length; j++) {
        grabArray.push(board.map(element => element[j]).splice(0,4))
        grabArray.push(board.map(element => element[j]).splice(1,4))
        grabArray.push(board.map(element => element[j]).splice(2,4))
    }
    return grabArray 
    
}

// Function that creates an array of arrays. 6 arrays are created diagonally from right to left(starting at row 2 index 0) and then left to right(starting at row 2 index 6) by grabbing 4 elements for each array. Total amount is 6*6 == 24 arrays
// filter() is used in each for loop to remove undefined term from array
// finally the return statement returns a filter of only the arrays that equal to 4
function diagonalGrab() {
    let grabArray = []

    for(let j = -3; j <= 2; j++) {

        // // row 2 column 0 right diagonally
        grabArray.push(board.map((element, index) => (element[index-j])).splice(0,4).filter(element => element !== undefined))
        grabArray.push(board.map((element, index) => (element[index-j])).splice(1,4).filter(element => element !== undefined))
        grabArray.push(board.map((element, index) => (element[index-j])).splice(2,4).filter(element => element !== undefined))

    }

    for(let j = -1; j <= 5; j++) {

        // row 2 column 6 left diagonally
        grabArray.push(board.map((element, index) => (element[(element.length-j)-index])).filter(element => element !== undefined).splice(0,4))
        grabArray.push(board.map((element, index) => (element[(element.length-j)-index])).filter(element => element !== undefined).splice(1,4))
        grabArray.push(board.map((element, index) => (element[(element.length-j)-index])).filter(element => element !== undefined).splice(2,4))

    }

    return grabArray.filter(element => element.length === 4) 
        
}

// Check true or false if every acrossGrab index or diagonalGrab is equal to possible wins for yellow
function isValidYellowAcrossDiagonalWin(i) {

    return  acrossGrab()[i].every((value, index) => value === possibleWins.yellowsWin[index]) || diagonalGrab()[i].every((value, index) => value === possibleWins.yellowsWin[index]) 
}

// Check true or false if every downGrab index is equal to possible wins for yellow
function isValidYellowDownWin(i) {

    return downGrab()[i].every((value, index) => value === possibleWins.yellowsWin[index])

}

// Check true or false if every downGrab index is equal to possible wins for red
function isValidRedDownWin(i) {

    return downGrab()[i].every((value, index) => value === possibleWins.redsWin[index])

}

// Check true or false if every acrossGrab index or diagonalGrab is equal to possible wins for red
function isValidRedAcrossDiagonalWin(i) {
    
    return acrossGrab()[i].every((value, index) => value === possibleWins.redsWin[index]) || diagonalGrab()[i].every((value, index) => value === possibleWins.redsWin[index]) 

}

// Checks if the arrays in the board are not equal to null and possible wins
function nobodyWins(i) {
    const nobodyReds =   !acrossGrab()[i].some((value) => value === null) && !acrossGrab()[i].every((value, index) => value === possibleWins.redsWin[index])
    const nobodyYellows =  !acrossGrab()[i].some((value) => value === null) && !acrossGrab()[i].every((value, index) => value === possibleWins.yellowsWin[index])
    const fullBoard = !board.flatMap(element => element).some(value => value === null)

    return  (nobodyReds || nobodyYellows) && fullBoard
} 

// Uses a count function to check if the row of the column chsoen is empty or not
function takeTurn(row, column) {

        let count = board.length-1

        if ((board[count][column] === null && (hadGo) && (!winner))) {
            hadGo = !hadGo
            return board[count].splice(column, 1, "red")
    
        } else if (board[count][column] === null && (!hadGo) && (!winner)) {
            hadGo = !hadGo
            return board[count].splice(column, 1, "yellow")
    
        } else if (board[count][column] !== null && (hadGo) && (!winner)){ 
            hadGo = !hadGo
            count = count - board.filter(element => element[column] !== null).length
            return board[count].splice(column, 1, "red")

        } else if (board[count][column] !== null && (!hadGo) && (!winner)){
            hadGo = !hadGo
            count = count - board.filter(element => element[column] !== null).length
            return board[count].splice(column, 1, "yellow")
        } else {
            
            return console.log("else:" , board)
            
        }

}


// checks if there is winner by using isValid... functions
// Uses 2 arrays because downGrab only has 21 arrays and using one loop had side effects as acrossGrab and diagonalGrab had 24 arrays.
function checkWinner() {
    console.log("checkWinner")
    const player1 = document.getElementById("hidden-player").innerText
    const player2 = document.getElementById("hidden-player2").innerText
        
    for(let i = 0; i< downGrab().length; i++) {

        if (isValidRedDownWin(i)) {
            winner = true
            return player1
    
        } else if (isValidYellowDownWin(i)) {
            winner = true
            return player2
    
        } else {
            continue
        }
    
    }
    for(let i = 0; i< acrossGrab().length; i++) {
        if (isValidRedAcrossDiagonalWin(i)) {
            winner = true
            return player1
    
        } else if (isValidYellowAcrossDiagonalWin(i)) {
            winner = true
            return player2

        } else if(nobodyWins(i)) {
            winner = false
            console.log("nobody wins")
            return `nobody`
    
        } else {
            continue
        }
    
    }
}

// Shows board when input text is filled out by grabbing the innerText from html
function showBoard() {
    const checkElement = document.getElementById('hidden-player').innerText
    const checkElement2 = document.getElementById('hidden-player2').innerText  
    const getGrid = document.getElementById("grid")
    
    const displayBoard = checkElement.length != 0 && checkElement2.length != 0 ? getGrid.style.display = "block": {}

    return displayBoard
}


// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    board = [[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]]
    hadGo = true
    winner = false
    return board
}

// Return the current board state with either a "yellow" or a "red" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board;
}


if (typeof exports === 'possibleWins') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
        playerOneClick,
        playerTwoClick
        
    }
} else {
    console.log("Running in Browser")
}


function playerOneClick() {
    const input = document.getElementById("name-box")
    const playerName = document.getElementById("name-box").value
    const btn = document.getElementById("btn")
    const showName = document.getElementById("hidden-player")
    btn.style.display = "none"
    input.style.display = "none"
    showName.textContent = playerName
    showName.style.display ="block"
  }

const btn = document.getElementById("btn")
btn.addEventListener("click",playerOneClick)
btn.addEventListener("click", showBoard)

function playerTwoClick() {
    const input = document.getElementById("name-box2")
    const playerName = document.getElementById("name-box2").value
    const btn = document.getElementById("btn2")
    const showName = document.getElementById("hidden-player2")
    btn.style.display = "none"
    input.style.display = "none"
    showName.textContent = playerName
    showName.style.display ="block"
  }

const btn2 = document.getElementById("btn2")
btn2.addEventListener("click", playerTwoClick)
btn2.addEventListener("click", showBoard)

// console.log(document.getElementById()
