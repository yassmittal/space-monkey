class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('startImg', "./assets/others/starterImg.png")
  }

  create() {
    this.add.image(300, 300, 'startImg').setScale(0.8);
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);


    button.setInteractive({ useHandCursor: true });
    button.on('pointerdown', () => {
      this.scene.start("LevelsShowCase")
    });

    this.add.text(button.x, button.y, 'Start').setOrigin(0.5, 0.5);
  }
}


export default StartScene;