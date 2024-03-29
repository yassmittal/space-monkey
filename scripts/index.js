import Level1 from "./scenes/Levels/Level1.js";
import Level2 from "./scenes/Levels/Level2.js";
import Level3 from "./scenes/Levels/Level3.js";
import Level4 from "./scenes/Levels/Level4.js";
import Level5 from "./scenes/Levels/Level5.js";
import Level6 from "./scenes/Levels/Level6.js";
import Level7 from "./scenes/Levels/Level7.js";
import Level8 from "./scenes/Levels/Level8.js";
import Level9 from "./scenes/Levels/Level9.js";
import Level10 from "./scenes/Levels/Level10.js";
import Level11 from "./scenes/Levels/Level11.js";
import Level12 from "./scenes/Levels/Level12.js";

import LevelsShowCase from "./scenes/Levels/levelsShowcase.js";
import ConfirmModal from "./scenes/Modals/ConfirmModal.js";
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

  scene: [StartScene, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11, Level12, LevelsShowCase, SettingsModal, ConfirmModal, YouWonScene, YouLooseScene]
};

new Phaser.Game(config);