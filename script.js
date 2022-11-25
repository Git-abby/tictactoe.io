const playerXClass = 'x'
const playerCircleClass = 'circle'
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const gameBoard = document.getElementById('gameBoard')
const winMsgBox = document.getElementById('winMsgBox')
const winMsgTxt = document.getElementById('winTxt')
const restart = document.getElementById('restart')

let circleTurn

startGame()

restart.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerXClass)
        cell.classList.remove(playerCircleClass)
        cell.removeEventListener('click', handleClick)    
        cell.addEventListener('click', handleClick, {once : true})
    })
    setHover()
    winMsgBox.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    let currentClass = circleTurn ? playerCircleClass : playerXClass
    
    //Markin X||O on Cell
    placeMark(cell, currentClass)
    
    //WInner
    if(checkWin(currentClass)){
        gameOver(false)
    } else if(isTie()){
        gameOver(true)
    } else{
        
        //Switching the Turns
        swapTurns()
        setHover() 
    
    }   
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)    
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setHover(){
    gameBoard.classList.remove(playerXClass)
    gameBoard.classList.remove(playerCircleClass)
    if(circleTurn){
        gameBoard.classList.add(playerCircleClass)
    } else{
        gameBoard.classList.add(playerXClass)
    }
}

function checkWin(currentClass){
    return winningCombos.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function gameOver(draw){
    if(draw){
        winMsgTxt.innerHTML = "Match Tie"
    } else{
        winMsgTxt.innerHTML = `PLAYER ${circleTurn ? "'O'" : "'X'"} WON`
    }
    winMsgBox.classList.add('show')
}

function isTie(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerXClass) ||
               cell.classList.contains(playerCircleClass)
    })
}