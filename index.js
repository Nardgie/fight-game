// Grab canvas element from HTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas width and height
canvas.width = 1024;
canvas.height = 576;
// Set canvas background color
c.fillRect(0, 0, canvas.width, canvas.height);
//
const gravity =  0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: "./img/samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./img/samuraiMack/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./img/samuraiMack/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./img/samuraiMack/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/samuraiMack/Attack1.png",
            framesMax: 6
        },
        takeHit: {
            imageSrc: "./img/samuraiMack/Take hit - white silhouette.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./img/samuraiMack/Death.png",
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})
 // Draw player on to canvas// NO NEED, update() will call draw() for us

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "blue",
    offset: {
        x: 50,
        y: 0
    },
    imageSrc: "./img/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: "./img/kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./img/kenji/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./img/kenji/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./img/kenji/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/kenji/Attack1.png",
            framesMax: 4
        },
        takeHit: {
            imageSrc: "./img/kenji/Take hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./img/kenji/Death.png",
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

 // Draw enemy on to canvas// NO NEED, update() will call draw() for us
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreaseTimer()

// Create a animation loop
function animateLoop() {
    window.requestAnimationFrame(animateLoop);
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update() // cause we want it behind, not on top of player and enemy
    shop.update()
    c.fillStyle = "rgba(255, 255, 255, 0.15)"
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update();
    enemy.update();
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5
        player.switchSprite("run")
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5
        player.switchSprite("run")
    } else {
        player.switchSprite("idle")
    }

    // player jump
    if (player.velocity.y < 0) {
        player.switchSprite("jump")
    } else if (player.velocity.y > 0) {
        player.switchSprite("fall")
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5
        enemy.switchSprite("run")
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5
        enemy.switchSprite("run")
    } else {
        enemy.switchSprite("idle")
    }

    // enemy jump
    if (enemy.velocity.y < 0) {
        enemy.switchSprite("jump")
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite("fall")
    }

    // detect for collision & enemy gets hit
    if  (
        rectangularCollision({
            rect1: player,
            rect2: enemy
        }) &&
        player.isAttacking && player.framesCurrent === 4) {
            enemy.takeHit()
            player.isAttacking = false;

            gsap.to("#enemyHealth", {
                width: `${enemy.health}%`
            })
    }
    // if player 1 misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent === 2) {
            player.takeHit()
            enemy.isAttacking = false;
            
            gsap.to("#playerHealth", {
                width: `${player.health}%`
            })
    }
    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}
animateLoop();

// Add event listener to window to listen for keydown events
window.addEventListener("keydown", (event) => {
    if (!player.dead) {
        switch (event.key) {
                case "d": // Move player right by 1px
                    keys.d.pressed = true
                    player.lastKey = "d"
                    break;
                case "a": // Move player left by 1px
                    keys.a.pressed = true
                    player.lastKey = "a"
                    break;
                case "w": // jump
                    player.velocity.y = -20
                    break;
                case " ": // attack
                    player.attack()
                    break;
        }
    }
    
    if (!enemy.dead) {
        switch (event.key) {
            case "ArrowRight": // Move enemy right by 1px
                keys.ArrowRight.pressed = true
                enemy.lastKey = "ArrowRight"
                break;
            case "ArrowLeft": // Move player left by 1px
                keys.ArrowLeft.pressed = true
                enemy.lastKey = "ArrowLeft"
                break;
            case "ArrowUp": // jump
                enemy.velocity.y = -20
                break;
            case "ArrowDown": 
                enemy.attack()
                break;
        }    
    }
    
})

// Add event listener to window to listen for keyup events
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d": // Move player right by 1px
            keys.d.pressed = false
            break;
        case "a": // Move player left by 1px
            keys.a.pressed = false
            break;
        case "w": // jump
            keys.w.pressed = false
            break;
        
        case "ArrowRight": // Move player right by 1px
            keys.ArrowRight.pressed = false
            break;
        case "ArrowLeft": // Move player left by 1px
            keys.ArrowLeft.pressed = false
            break;
        case "ArrowUp": // jump
            keys.ArrowUp.pressed = false
            break;
    }
})

