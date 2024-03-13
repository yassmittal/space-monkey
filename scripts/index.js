console.log(Phaser)

import Game from "./scenes/game.js";
const config = {
  width: 600,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },

  scene: [Game]
};

new Phaser.Game(config);