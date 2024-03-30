class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('modalBg', "./assets/others/modalBG.png")
    this.load.image('buttonImg', "./assets/buttons/buttonImg.png")
    this.load.image('startImg', "./assets/others/starterImg.png")
    this.load.audio('bgMusic', './assets/sounds/backgroundMusic.mp3');
    this.load.audio('clickSound', './assets/sounds/click.mp3');

    this.asteroids = ["asteroid1", "asteroid2", "asteroid3"];

    this.asteroids.forEach(asteroid => {
      this.load.image(`${asteroid}`, `./assets/tackels/${asteroid}.png`)
    })

    this.load.image('background', "./assets/background/bg_single_1536x3840.png");
    this.load.image('anamoly', "./assets/objects/spaceObjects/space_object_anomaly.png")
    this.load.image('galaxy', "./assets/objects/spaceObjects/space_object_galaxy.png")
    this.load.image('planetsunrise', "./assets/objects/spaceObjects/space_object_planetsunrise.png")

    this.load.atlas('monkey',
      './assets/spriteSheet/monkey/monkey.png', './assets/spriteSheet/monkey/monkey.json');

    this.load.spritesheet('boom', 'assets/spriteSheet/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

    this.load.spritesheet('buttons',
      'assets/functionsBtns/buttons.png',
      { frameWidth: 125, frameHeight: 128, endFrame: 14 }
    );

    this.load.image('homeIcon', "./assets/functionsBtns/homeIcon.svg")

    this.load.spritesheet('buttons2',
      'assets/functionsBtns/buttons.png',
      { frameWidth: 125, frameHeight: 123, endFrame: 14 }
    );

    this.load.spritesheet('buttons3',
      'assets/functionsBtns/buttons.png',
      { frameWidth: 250, frameHeight: 123, endFrame: 14 }
    );

    this.load.image('banana', "./assets/tackels/powerup_banana.png")
    this.load.image('powerUpBlue', "./assets/tackels/powerup_blue.png")
    this.load.image('powerUpRed', "./assets/tackels/powerup_red.png")

    this.load.image('alienSideGreen', "./assets/objects/enemies/alien_side_green.png")
    this.load.image('alignTop1', "./assets/objects/enemies/alien_top_01.png")
    this.load.image('alignTop2', "./assets/objects/enemies/alien_top_02.png")

    this.load.image('grenadeBlue', "./assets/tackels/object_grenade_blue.png")

    this.load.image('spaceFlier', "./assets/objects/spaceFlier/spaceflier_01_a.png")

    this.load.audio('achievement', './assets/sounds/achievement.wav');
    this.load.audio('powerUp', "./assets/sounds/powerUp.mp3")
    this.load.audio('explosion', "./assets/sounds/explosion.mp3")
    this.load.audio('gameOver', "./assets/sounds/gameOver.mp3")
    this.load.audio('levelComplete', "./assets/sounds/levelComplete.mp3")
    this.load.audio('fallingBomb', "./assets/sounds/fallingBomb.mp3")

  }

  create() {
    this.add.image(300, 300, 'startImg').setScale(0.8);
    const button = this.add.image(300, 300, 'buttonImg').setScale(0.2);
    this.bgMusic = this.sound.add('bgMusic');
    this.bgMusic.play()
    this.bgMusic.loop = true;

    this.clickSound = this.sound.add('clickSound')


    button.setInteractive({ useHandCursor: true });
    button.on('pointerdown', () => {
      this.scene.stop();
      this.scene.start("LevelsShowCase", { bgMusic: this.bgMusic })
      this.clickSound.play()
    });

    this.add.text(button.x, button.y, 'Start').setOrigin(0.5, 0.5);
  }
}


export default StartScene;