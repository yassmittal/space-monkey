class ButtonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ButtonScene' });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
  }

  create() {
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    button.setInteractive({ useHandCursor: true });

    button.on('pointerdown', () => {
      this.scene.start("Game")
    });

    const restartText = this.add.text(button.x, button.y, 'Restart').setOrigin(0.5, 0.5);
  }
}


export default ButtonScene;