function rectangularCollision({rect1, rect2}) {
    return (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x && 
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y 
        && rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
        rect1.isAttacking)
}

// Refactor displayTexts to be its own function
function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = "flex"
    if (player.health === enemy.health) {
        document.querySelector("#displayText").innerHTML = "Tie"
    } else if (player.health > enemy.health) {
        
        document.querySelector("#displayText").innerHTML = "Player 1 Wins"
    } else if (player.health < enemy.health) {

        document.querySelector("#displayText").innerHTML = "Player 2 Wins"
    }
}

// Create function to decrease timer
let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }
    if (timer === 0) {
        document.querySelector("#displayText").style.display = "flex"
        determineWinner({player, enemy, timerId})
    } 
}