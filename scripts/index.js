import Game from "./scenes/game.js";
import ButtonScene from "./scenes/button.js"
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

  scene: [Game]
};

new Phaser.Game(config);