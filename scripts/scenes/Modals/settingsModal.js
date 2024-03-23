class SettingsModal extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsModal' });
  }

  init(data) {
    this.bgMusic = data.bgMusic;
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

    this.musicBtn = this.add.sprite(this.modalBg.x - 100 + this.modalBg.width - 60, this.modalBg.y + 50, 'buttons2').setScale(0.5).setOrigin(1, 1);
    this.musicBtn.setFrame(8);
    this.musicBtn.setInteractive({ useHandCursor: true });
    // let this.musicIconPauseText = this.add.text(this.musicBtn.x - 45, this.musicBtn.y - 62, '', {
    //   fontSize: '70px',
    //   fontWeight: "900",
    // })

    this.musicIconPauseText = this.add.text(this.musicBtn.x - 45, this.musicBtn.y - 62, '', {
      fontSize: '70px',
      fontWeight: "900",
    })
    console.log(this.musicBtn.y - 62)

    this.musicBtn.on('pointerdown', () => {

      if (this.bgMusic.isPlaying) {
        this.bgMusic.pause();
        this.musicIconPauseText.setText('/')
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

  }

  update() {

    if (this.modalOpened == false) {
      if (this.modalBg.y >= 200) return;
      this.modalBg.y += 20;
      this.crossBtn.y += 20;
      this.musicBtn.y += 20;
      this.musicIconPauseText.y += 20;
    } else if (this.modalOpened == true) {
      this.modalBg.y -= 20;
      this.crossBtn.y -= 20;
      this.musicBtn.y -= 20;
      this.musicIconPauseText.y -= 20;

      if (this.modalBg.y <= -190) {
        this.scene.pause()
      }
    }

  }
}


export default SettingsModal;