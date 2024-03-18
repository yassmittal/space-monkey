import Game from "./scenes/game.js";
import YouLooseScene from "./scenes/youLooseScene.js";
import YouWonScene from "./scenes/youWonScene.js"
const config = {
  width: 600,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [Game, YouWonScene, YouLooseScene]
};

new Phaser.Game(config);