class ConfirmModal extends Phaser.Scene {
  constructor() {
    super({ key: 'ConfirmModal' });
  }

  init(data) {
    this.confirmMsg = data.confirmMsg;
    this.levelScene = data.scene;
  }

  preload() {
    this.load.image('modalBg', "./assets/others/modalBG.png")
    this.clickSound = this.sound.add('clickSound')
  }

  create() {

    this.modalOpened = false;

    this.modalBg = this.add.image(140, -200, 'modalBg').setOrigin(0).setScale(0.8);

    this.crossBtn = this.add.sprite(this.modalBg.x + this.modalBg.width - 60, this.modalBg.y + 50, 'buttons').setScale(0.5).setOrigin(1, 1)
      .setInteractive({ useHandCursor: true });
    this.crossBtn.setFrame(6);


    this.YesBtn = this.add.sprite(this.modalBg.x + this.modalBg.width / 4, this.modalBg.y + this.modalBg.height / 2 + 30, 'buttons3').setScale(0.5)
    this.YesBtn.setFrame(5);
    this.YesBtn.setInteractive({ useHandCursor: true });

    this.YesBtn.on('pointerdown', () => {
      this.clickSound.play()
      this.modalOpened = true;
      this.scene.launch('LevelsShowCase')
    });

    this.YesBtnText = this.add.text(this.YesBtn.x - this.YesBtn.width / 10, this.YesBtn.y - this.YesBtn.height / 10, "Yes", {
      fontSize: '24px',
      fontStyle: "700",
    })

    this.NoBtn = this.add.sprite(this.modalBg.x + (this.modalBg.width / 2 + 35), this.modalBg.y + this.modalBg.height / 2 + 30, 'buttons3').setScale(0.5)
    this.NoBtn.setFrame(5);
    this.NoBtn.setInteractive({ useHandCursor: true });

    this.NoBtnText = this.add.text(this.NoBtn.x - this.NoBtn.width / 14, this.NoBtn.y - this.NoBtn.height / 10, "No", {
      fontSize: '24px',
      fontStyle: "700",
    })

    this.NoBtn.on('pointerdown', () => {
      this.clickSound.play()
      this.modalOpened = true;
      this.levelScene.scene.resume()
    });


    this.crossBtn.on('pointerdown', () => {
      this.clickSound.play()
      this.modalOpened = true;
      this.levelScene.scene.resume()
    });


    this.YesBtn.on('pointerover', () => {
      console.log('hovering')
      this.YesBtn.setFrame(7);
      this.YesBtn.y += 2;
    })

    this.YesBtn.on('pointerout', () => {
      this.YesBtn.setFrame(5);
      this.YesBtn.y -= 2;

    })

    this.confirmMsgText = this.add.text(this.modalBg.x + 35, this.modalBg.y + 40, `${this.confirmMsg}`, {
      fontSize: '18px',
      fontStyle: "700",
      color: "#5b0b72"
    })
  }

  update() {

    if (this.modalOpened == false) {
      if (this.modalBg.y >= 200) return;
      this.modalBg.y += 20;
      this.crossBtn.y += 20;
      this.confirmMsgText.y += 20;
      this.YesBtn.y += 20;
      this.YesBtnText.y += 20;
      this.NoBtn.y += 20;
      this.NoBtnText.y += 20;
    } else if (this.modalOpened == true) {
      this.modalBg.y -= 20;
      this.crossBtn.y -= 20;
      this.confirmMsgText.y -= 20;
      this.YesBtn.y -= 20;
      this.YesBtnText.y -= 20;
      this.NoBtn.y -= 20;
      this.NoBtnText.y -= 20;

      if (this.modalBg.y <= -190) {
        this.scene.pause()
      }
    }

  }
}


export default ConfirmModal;