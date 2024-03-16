import Game from "./game.js";

class ButtonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ButtonScene', active: true });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")

    // Preload any assets needed for the button scene
  }

  create() {
    // Create the button
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    button.setInteractive({ useHandCursor: true });

    button.on('pointerdown', () => {
      // Resume the main scene when the button is clicked
      this.scene.get("Game").resumeGame();
      console.log('Button clicked');
    });

    const restartText = this.add.text(button.x, button.y, 'Restart').setOrigin(0.5, 0.5);
  }
}


export default ButtonScene;