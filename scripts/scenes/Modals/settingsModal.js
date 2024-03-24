class SettingsModal extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsModal' });
  }

  init(data) {
    this.bgMusic = data.bgMusic;
    this.levelScene = data.scene;
  }

  preload() {
    // this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    // this.load.image('startImg', "./assets/others/starterImg.png")
    this.load.image('modalBg', "./assets/others/modalBG.png")
    // this.load.spritesheet('buttons',
    //   'assets/functionsBtns/buttons.png',
    //   { frameWidth: 125, frameHeight: 128, endFrame: 14 })

  }

  create() {

    this.modalOpened = false;

    this.modalBg = this.add.image(140, -200, 'modalBg').setOrigin(0).setScale(0.8);

    this.crossBtn = this.add.sprite(this.modalBg.x + this.modalBg.width - 60, this.modalBg.y + 50, 'buttons').setScale(0.5).setOrigin(1, 1);
    this.crossBtn.setFrame(6);
    this.crossBtn.setInteractive({ useHandCursor: true });

    this.musicBtn = this.add.sprite(0, 0, 'buttons2').setScale(0.5).setOrigin(1, 1);
    this.musicBtn.setFrame(8);
    this.musicBtn.setInteractive({ useHandCursor: true });

    this.restartBtn = this.add.sprite(0, 0, 'buttons').setScale(0.5).setOrigin(1, 1);
    this.restartBtn.setFrame(5);
    this.restartBtn.setInteractive({ useHandCursor: true });

    this.restartBtn.on('pointerdown', () => {
      this.levelScene.scene.restart()
      this.modalOpened = true;
      console.log('restarting the scene');

    })

    const settingBtns = []
    // let this.musicIconPauseText = this.add.text(this.musicBtn.x - 45, this.musicBtn.y - 62, '', {
    //   fontSize: '70px',
    //   fontWeight: "900",
    // })

    settingBtns.push(this.musicBtn)
    settingBtns.push(this.restartBtn)

    this.musicIconPauseText = this.add.text(this.musicBtn.x - 45, this.musicBtn.y - 62, '', {
      fontSize: '70px',
      fontWeight: "900",
    })
    this.musicBtn.on('pointerdown', () => {

      if (this.bgMusic.isPlaying) {
        this.bgMusic.pause();
        this.musicIconPauseText.setText('/')
        console.log('adding text')
      } else {
        this.bgMusic.play();
        this.musicIconPauseText.setText('')
        console.log('removing text')
      }
    });


    if (this.bgMusic.isPlaying) {
      this.musicIconPauseText.setText('')
    } else {
      this.musicIconPauseText.setText('/')
    }

    this.crossBtn.on('pointerdown', () => {
      this.modalOpened = true;
      this.scene.resume('Level1')
    });

    Phaser.Actions.GridAlign(settingBtns, {
      width: 3,
      cellWidth: 100,
      cellHeight: 10,
      x: this.modalBg.x,
      y: this.modalBg.y
    });

  }

  update() {

    if (this.modalOpened == false) {
      if (this.modalBg.y >= 200) return;
      this.modalBg.y += 20;
      this.crossBtn.y += 20;
      this.musicBtn.y += 20;
      this.restartBtn.y += 20
      this.musicIconPauseText.y += 20;
    } else if (this.modalOpened == true) {
      this.modalBg.y -= 20;
      this.crossBtn.y -= 20;
      this.musicBtn.y -= 20;
      this.restartBtn.y -= 20
      this.musicIconPauseText.y -= 20;

      if (this.modalBg.y <= -190) {
        this.scene.pause()
      }
    }

  }
}


export default SettingsModal;