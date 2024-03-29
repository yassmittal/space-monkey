class LevelsShowCase extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelsShowCase' });
  }

  init(data) {
    this.bgMusic = data.bgMusic;
  }

  preload() {
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('startImg', "./assets/others/starterImg.png")
  }

  create() {
    this.add.image(300, 300, 'startImg').setScale(0.8);
    this.clickSound = this.sound.add('clickSound')

    const levelBtns = [];
    for (let i = 0; i < 12; i++) {
      levelBtns.push(this.physics.add.sprite(0, 0, 'buttonImg').setScale(0.2).setOrigin(0, 0));
    }


    Phaser.Actions.GridAlign(levelBtns, {
      width: 3,
      cellWidth: 150,
      cellHeight: 70,
      x: 100,
      y: 100
    });

    levelBtns.forEach((levelBtn, index) => {
      let currentLevel = ++index;
      levelBtn.setInteractive({ useHandCursor: true });
      levelBtn.on('pointerdown', () => {
        this.clickSound.play()
        console.log(`Level${currentLevel}`)
        this.scene.start(`Level${currentLevel}`, { bgMusic: this.bgMusic })
      });

      this.add.text(levelBtn.x + 35, levelBtn.y + 26, `Level ${currentLevel}`);
      console.log(levelBtn.height)
    })

  }
}


export default LevelsShowCase;