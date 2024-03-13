class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {

    this.load.image('background', "./assets/background/bg_single_1536x3840.png")
    this.load.atlas('monkey',
      './assets/spriteSheet/monkey/monkey.png', './assets/spriteSheet/monkey/monkey.json');

    this.load.image('banana', "./assets/tackels/powerup_banana.png")


  }
  create() {
    const { width, height } = this.scale;

    this.bg = this.add.tileSprite(0, 0, width * 5 / 2, height * 5 / 2, 'background').setOrigin(0, 0).setScale(0.4);

    this.banana = this.physics.add.sprite(Phaser.Math.Between(20, width), -50, 'banana')
      .setScale(0.6)

    this.banana.setRandomPosition(0, 0, width, 0);


    this.monkey = this.physics.add.sprite(width / 2, height - 60, 'monkey')
      .setScale(0.6)

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNames('monkey', {
        start: 1,
        end: 2,
        prefix: "spacemonkey_fly0",
        suffix: ".png"
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.monkey.anims.play('fly', true)
  }
  update() {
    this.bg.tilePositionY -= 6;

    this.banana.setVelocityY(100)
  }

}

export default Game;
