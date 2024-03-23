import Level1 from "./scenes/Levels/Level1.js";
import Level2 from "./scenes/Levels/Level2.js";
import LevelsShowCase from "./scenes/Levels/levelsShowcase.js";
import SettingsModal from "./scenes/Modals/settingsModal.js";
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

  scene: [Level1, StartScene, LevelsShowCase, SettingsModal, Level2, YouWonScene, YouLooseScene]
};

new Phaser.Game(config);