class YouLooseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'YouLooseScene' });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('youLooseImg', "./assets/others/youLooseImg.png")

  }

  create() {
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    button.setInteractive({ useHandCursor: true });
    this.add.image(300, 200, "youLooseImg").setScale(0.5);
    console.log('you loose scene')

    button.on('pointerdown', () => {
      this.scene.start("Game")
    });

    const restartText = this.add.text(button.x, button.y, 'Restart').setOrigin(0.5, 0.5);
  }
}


export default YouLooseScene;