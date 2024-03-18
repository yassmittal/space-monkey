class YouWonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'YouWonScene' });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('youWinImg', "./assets/others/youWinImg.png")
  }

  create() {
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    this.add.image(300, 200, "youWinImg").setScale(0.5);
    button.setInteractive({ useHandCursor: true });
    console.log('you won scene')

    button.on('pointerdown', () => {
      this.scene.start("Game")
    });

    const restartText = this.add.text(button.x, button.y, 'Restart').setOrigin(0.5, 0.5);
  }
}


export default YouWonScene;