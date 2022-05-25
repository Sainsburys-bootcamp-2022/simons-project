// Make your changes to store and update game state in this file

// Creates board and set hadGo to true and winner to false
let board = [[null, null, null], [null, null, null], [null, null, null]]
let hadGo = true
let winner = false


// Creates an object for two possible ways of winning
const possibleWins = {
    crossesWin: ["cross", "cross", "cross"], 
    noughtsWin: ["nought", "nought", "nought"]
}

// function to grab
function crossesWin(i){

    const crossesAcross = board[i].length === possibleWins.crossesWin.length && board[i].every((value, index) => value === possibleWins.crossesWin[index])
    const crossesDown = board[i].length === possibleWins.crossesWin.length && board.map(element => element[i]).every((value, index) => value === possibleWins.crossesWin[index])
    const crossesDiagonally =   board[i].length === possibleWins.crossesWin.length && board.map((element, index) => (element[index])).every((value, index) => value === possibleWins.crossesWin[index]) ||
                                board[i].length === possibleWins.crossesWin.length && board.map((element, index) => (element[(element.length-1)-index])).every((value, index) => value === possibleWins.crossesWin[index]) 


    return crossesAcross || crossesDown || crossesDiagonally
}


function noughtsWin(j){
    const noughtsAcross = board[j].length === possibleWins.noughtsWin.length && board[j].every((value, index) => value === possibleWins.noughtsWin[index])
    const noughtsDown = board[j].length === possibleWins.noughtsWin.length && board.map(element => element[j]).every((value, index) => value === possibleWins.noughtsWin[index])
    const noughtsDiagonally =   board[j].length === possibleWins.noughtsWin.length && board.map((element, index) => (element[index])).every((value, index) => value === possibleWins.noughtsWin[index]) ||
                                board[j].length === possibleWins.noughtsWin.length && board.map((element, index) => (element[(element.length-1)-index])).every((value, index) => value === possibleWins.noughtsWin[index]) 

    return noughtsAcross || noughtsDown || noughtsDiagonally
}

function nobodyWins(n) {
    const nobodyCrosses = !board[n].some((value) => value === null) && !board[n].every((value, index) => value === possibleWins.crossesWin[index])
    const nobodyNoughts = !board[n].some((value) => value === null) && !board[n].every((value, index) => value === possibleWins.noughtsWin[index])
    const fullBoard = !board.flatMap(element => element).some(value => value === null)

    return (nobodyNoughts || nobodyCrosses) && fullBoard

}


function showBoard() {
    const checkElement = document.getElementById('hidden-player').innerText
    const checkElement2 = document.getElementById('hidden-player2').innerText  
    const getGrid = document.getElementById("grid")
    
    const displayBoard = checkElement.length != 0 && checkElement2.length != 0 ? getGrid.style.display = "block": {}

    return displayBoard
}




function takeTurn(row, column) {

    if ((board[row][column] === null) && (hadGo) && (!winner)) {
        hadGo = !hadGo
        return board[row].splice(column, 1, "cross"), console.log("if: ", board), console.log(hadGo)

    } else if (board[row][column] === null && (!hadGo) && (!winner)) {
        hadGo = !hadGo
        return board[row].splice(column, 1, "nought"), console.log("elseif:", board), console.log(hadGo)

    } else {
        return console.log("else:" , board)

    }
    
}


// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {
    const player1 = document.getElementById("hidden-player").innerText
    const player2 = document.getElementById("hidden-player2").innerText
    

    for (l=0; l<3; l++){
        if(crossesWin(l)) {
            winner = true
            return player1
        } else if (noughtsWin(l)) {
            winner = true
            return player2

        } else if(nobodyWins(l)) {
                winner = false
                return `nobody`
    
        } else {
            continue
        } 

 }
}

// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    board = [[null, null, null], [null, null, null], [null, null, null]]
    hadGo = true
    winner = false
    return board
}

// Return the current board state with either a "nought" or a "cross" in
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
        playerTwoClick,
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
