class YouWonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'YouWonScene' });
  }

  init(data) {
    this.nextLevel = data.nextLevel;
    this.currentLevel = data.currentLevel;
    this.bgMusic = data.bgMusic
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('youWinImg', "./assets/others/youWinImg.png")
  }

  create() {
    // const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    const youWonBtn = this.add.image(220, 300, 'buttonImg').setScale(0.2);
    this.add.image(300, 200, "youWinImg").setScale(0.5);
    youWonBtn.setInteractive({ useHandCursor: true });

    const nextLevelBtn = this.add.image(380, 300, 'buttonImg').setScale(0.2);
    this.add.image(300, 200, "youWinImg").setScale(0.5);
    nextLevelBtn.setInteractive({ useHandCursor: true });

    youWonBtn.on('pointerdown', () => {
      this.scene.start(`${this.currentLevel}`)

      // if (this.bgMusic.isPlaying) {
      this.bgMusic.resume()
      // }
    });

    nextLevelBtn.on('pointerdown', () => {
      this.scene.start(`${this.nextLevel}`, { bgMusic: this.bgMusic })
    });

    const restartText = this.add.text(youWonBtn.x, youWonBtn.y, 'Restart').setOrigin(0.5, 0.5);
    const NextLevelText = this.add.text(nextLevelBtn.x, nextLevelBtn.y, 'Next Level').setOrigin(0.5, 0.5);
  }
}


export default YouWonScene;