class SettingsModal extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsModal' });
  }

  init(data) {
    this.bgMusic = data.bgMusic;
    this.levelScene = data.scene;
  }

  preload() {
    this.load.image('modalBg', "./assets/others/modalBG.png")
  }

  create() {

    this.modalOpened = false;

    this.modalBg = this.add.image(140, -200, 'modalBg').setOrigin(0).setScale(0.8);

    this.crossBtn = this.add.sprite(this.modalBg.x + this.modalBg.width - 60, this.modalBg.y + 50, 'buttons').setScale(0.5).setOrigin(1, 1);
    this.crossBtn.setFrame(6);
    this.crossBtn.setInteractive({ useHandCursor: true });

    this.musicBtn = this.add.sprite(0, 0, 'buttons2').setScale(0.5);
    this.musicBtn.setFrame(8);
    this.musicBtn.setInteractive({ useHandCursor: true });

    this.restartBtn = this.add.sprite(0, 0, 'buttons').setScale(0.5);
    this.restartBtn.setFrame(5);
    this.restartBtn.setInteractive({ useHandCursor: true });

    this.restartBtn.on('pointerdown', () => {
      this.levelScene.scene.restart()
      this.modalOpened = true;
    })

    const settingBtns = []
    settingBtns.push(this.restartBtn)
    settingBtns.push(this.musicBtn)

    Phaser.Actions.GridAlign(settingBtns, {
      width: 2,
      cellWidth: 60,
      cellHeight: 30,
      x: this.modalBg.x + this.modalBg.width / 7,
      y: this.modalBg.y + this.modalBg.height / 8
    });

    this.musicIconPauseText = this.add.text(304, -139, '', {
      fontSize: '70px',
      fontWeight: "900",
    })
    this.musicBtn.on('pointerdown', () => {

      if (this.bgMusic.isPlaying) {
        this.bgMusic.pause();
        this.musicIconPauseText.setText('/')
      } else {
        this.bgMusic.play();
        this.musicIconPauseText.setText('')
      }
    });


    if (this.bgMusic.isPlaying) {
      this.musicIconPauseText.setText('')
    } else {
      this.musicIconPauseText.setText('/')
    }

    this.crossBtn.on('pointerdown', () => {
      this.modalOpened = true;
      this.scene.resume(`${this.levelScene}`)
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