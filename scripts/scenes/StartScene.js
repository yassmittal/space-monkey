class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('startImg', "./assets/others/starterImg.png")
    this.load.audio('bgMusic', './assets/sounds/backgroundMusic.mp3');

  }

  create() {
    this.add.image(300, 300, 'startImg').setScale(0.8);
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    this.bgMusic = this.sound.add('bgMusic');
    this.bgMusic.play()
    this.bgMusic.loop = true;


    button.setInteractive({ useHandCursor: true });
    button.on('pointerdown', () => {
      this.scene.start("LevelsShowCase", { bgMusic: this.bgMusic })
    });

    this.add.text(button.x, button.y, 'Start').setOrigin(0.5, 0.5);
  }
}


export default StartScene;