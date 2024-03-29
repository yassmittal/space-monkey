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
    const youWonBtn = this.add.image(220, 300, 'buttonImg').setScale(0.2);
    this.add.image(300, 200, "youWinImg").setScale(0.5);
    youWonBtn.setInteractive({ useHandCursor: true });

    if (this.nextLevel) {
      const nextLevelBtn = this.add.image(380, 300, 'buttonImg').setScale(0.2);
      this.add.image(300, 200, "youWinImg").setScale(0.5);
      nextLevelBtn.setInteractive({ useHandCursor: true });

      nextLevelBtn.on('pointerdown', () => {
        this.scene.stop(`${this.currentLevel}`)
        this.scene.start(`${this.nextLevel}`, { bgMusic: this.bgMusic })

        if (!this.bgMusic.isPlaying) {
          this.bgMusic.play()
        }
      });

      const NextLevelText = this.add.text(nextLevelBtn.x, nextLevelBtn.y, 'Next Level').setOrigin(0.5, 0.5);
    } else {
      youWonBtn.x = 300;
    }

    youWonBtn.on('pointerdown', () => {
      this.scene.start(`${this.currentLevel}`)

      if (!this.bgMusic.isPlaying) {
        this.bgMusic.play()
      }
    });

    const restartText = this.add.text(youWonBtn.x, youWonBtn.y, 'Restart').setOrigin(0.5, 0.5);
  }
}


export default YouWonScene;