import Level1 from "./scenes/Levels/Level1.js";
import Level2 from "./scenes/Levels/Level2.js";
import LevelsShowCase from "./scenes/Levels/levelsShowcase.js";
import StartScene from "./scenes/StartScene.js";
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

  scene: [StartScene, LevelsShowCase, Level1, Level2, YouWonScene, YouLooseScene]
};

new Phaser.Game(config);