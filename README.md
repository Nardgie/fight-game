# README for Fighting Game

Welcome to our brand new fighting game where players will face off against each other or the computer in an epic battle to the finish!

## Description:

This game features two fighters, each with its own set of animations and attacks. The battlefield is set against a visually appealing background, and features additional sprites like a shop.

## Gameplay:

1. **Player Movement:**
   - **Move Left**: 'A'
   - **Move Right**: 'D'
   - **Jump**: 'W'
   - **Attack**: 'Spacebar'

2. **Enemy Movement:**
   - **Move Left**: 'ArrowLeft'
   - **Move Right**: 'ArrowRight'
   - **Jump**: 'ArrowUp'
   - **Attack**: 'ArrowDown'

Collisions between the player and enemy are detected and if an attack hits, the opponent's health will decrease. The game's end is determined by the health of the players.

## Game Features:

- **Canvas Size**: 1024x576 pixels.
- **Background**: An image rendered behind all game elements.
- **Shop**: An animated sprite in the game scene.
- **Player & Enemy**: Animated sprites with various states like 'idle', 'run', 'jump', 'fall', 'attack', 'take hit', and 'death'.
- **Attack Mechanism**: Each player has an attack box, and successful hits are determined by the collision of these boxes.
- **End Game**: The game will determine the winner based on the health of each player.
- **UI Elements**: Player and enemy health bars are updated in real-time with animations.

## Technical Details:

- The game is built using HTML5 Canvas and JavaScript.
- The game runs in an animation loop using `requestAnimationFrame`.
- The game listens for keypress events to control the movement and actions of the player and the enemy.
- Collision detection is managed by the `rectangularCollision` function.
- The game also uses the GSAP (GreenSock Animation Platform) for animating certain UI elements like the health bars.

## Installation and Running:

1. Clone the repository or download the game files.
2. Ensure you have all the image assets in the `./img/` directory.
3. Open the HTML file in a browser to start the game.

## Feedback:

We appreciate your feedback and suggestions! Feel free to open issues or pull requests if you have any improvements or fixes.

## License:

This game is licensed under [YOUR_LICENSE_HERE]. Refer to the LICENSE file for more details.

Thank you for checking out our game! Happy fighting!
