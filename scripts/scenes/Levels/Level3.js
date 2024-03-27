let rotationValue = 0;
let rotationValueForGranide = 0;
class Level3 extends Phaser.Scene {

  constructor() {
    super({
      key: "Level3"
    })
  }

  init(data) {
    this.bgMusic = data.bgMusic;
  }

  preload() {

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

    this.monkeyDeadOne = false;
    const { width, height } = this.scale;


    const achievementSound = this.sound.add('achievement');
    const powerUpSound = this.sound.add('powerUp');
    this.explosionSound = this.sound.add('explosion')
    const gameOverSound = this.sound.add('gameOver')
    const levelCompleteSound = this.sound.add('levelComplete')
    this.fallingBombSound = this.sound.add('fallingBomb')



    this.score = 0;
    this.bombAlreadyMade = false;
    this.bombBodyEnabled = false;
    this.doneWaitingForBombRotation = false;


    this.bg = this.add.tileSprite(0, 0, width * 5 / 2, height * 5 / 2, 'background').setOrigin(0, 0).setScale(0.4);

    this.alignTop2 = this.physics.add.sprite(100, -70, 'alignTop2');

    this.add.text(250, 10, 'Level 3', {
      fontSize: '32px',
      fontWeight: "700",
    })


    this.showcaseObjects = [
      this.add.sprite(Phaser.Math.Between(0, width), Phaser.Math.Between(50, height), 'anamoly').setScale(0.4),
      this.add.sprite(Phaser.Math.Between(0, width), Phaser.Math.Between(50, height), 'galaxy').setScale(0.2),
      this.add.sprite(Phaser.Math.Between(0, width), Phaser.Math.Between(50, height), 'planetsunrise').setScale(0.15),
    ];

    this.banana = this.physics.add.sprite(width / 2, -50, 'banana')
      .setScale(0.6);

    this.physics.add.sprite(30, 20, 'banana')
      .setScale(0.6);

    let scoreText = this.add.text(50, 5, `:${this.score}`, {
      fontSize: '32px',
      fontWeight: "700",
    })

    this.powerUpBlue = this.physics.add.sprite(width / 2, 0, 'powerUpBlue')
      .setScale(0.7);

    this.asteroidsSprites = this.physics.add.group();


    let currentAsteroid = 0;

    var timer = this.time.addEvent({
      delay: 8000,
      callback: () => {
        this.asteroidsSprites.create(Phaser.Math.Between(0, width), -200, `${this.asteroids[currentAsteroid]}`)

        if (currentAsteroid >= this.asteroids.length - 1) {
          currentAsteroid = 0;
        }
        ++currentAsteroid;

      },
      callbackScope: this,
      repeat: -1
    });

    this.monkey = this.physics.add.sprite(width / 2, height - 60, 'monkey')
      .setScale(0.6)
      .setCollideWorldBounds(true);



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

    this.anims.create({
      key: 'dead1',
      frames: [{ key: "monkey", frame: "spacemonkey_dead01.png" }],
      repeat: -1
    })

    this.anims.create({
      key: 'dead2',
      frames: [{ key: "monkey", frame: "spacemonkey_dead02.png" }],
      repeat: -1
    })

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
      frameRate: 20,
    })

    this.monkey.anims.play('fly', true)
    this.monkeyDeadFinally = (scene) => {
      scene.monkey.anims.play('dead2', true)
      scene.explosionSound.play()
      gameOver(scene, scene.bgMusic, gameOverSound)

    }

    this.physics.add.collider(this.monkey, this.asteroidsSprites, (child, otherObject) => {

      if (this.monkeyDeadOne) {
        this.monkeyDeadFinally(this)
        return;
      } else {
        otherObject.disableBody(true, true)
        this.monkey.anims.play('dead1', true)
        this.monkeyDeadOne = true;
        this.explosionSound.play()
      }

    })

    this.physics.add.collider(this.monkey, this.banana, () => {
      this.banana.disableBody(true, true)
      this.score += 1;
      achievementSound.play()
      scoreText.setText(`:${this.score}`)

      if (this.score >= 6) {
        callAlienShips(this)
      }

      if (this.score >= 12) {
        gameWon(this, this.bgMusic, levelCompleteSound)
      }
    }, null, this)

    this.physics.add.overlap(this.monkey, this.alignTop2, () => {
      this.alignTop2.disableBody(true, true);
    }, null, this)


    function callAlienShips(scene) {

    }

    this.physics.add.collider(this.monkey, this.powerUpBlue, () => {
      this.powerUpBlue.disableBody(true, true);
      powerUpSound.play()
      this.tweens.add({
        targets: this.monkey,
        scaleX: 1,
        scaleY: 1,
        duration: 2100,
        ease: 'easeInOut',
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          var tween2 = this.tweens.add({
            targets: this.monkey,
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 35000,
            ease: 'Linear',
            yoyo: false,
            repeat: 0
          });
        },
        onCompleteScope: this,

      });


    })


    this.cursors = this.input.keyboard.createCursorKeys();


    this.grenadeBlue = this.physics.add.sprite(this.alignTop2.body.x + this.alignTop2.width / 2, this.alignTop2.body.y + this.alignTop2.height + 20, 'grenadeBlue').setScale(0.7).setOrigin(0.5, 0.5).disableBody(true, true);

    const hamburgetBtn = this.add.sprite(width - 40, 40, 'buttons').setScale(0.5);
    hamburgetBtn.setFrame(3);
    hamburgetBtn.setInteractive({ useHandCursor: true });

    const homeBtn = this.add.sprite(width - 110, 46, 'buttons2').setScale(0.5);
    homeBtn.setFrame(9);
    homeBtn.setInteractive({ useHandCursor: true });

    this.add.image(homeBtn.x, homeBtn.y, "homeIcon").setOrigin(0.4, 0.55).setScale(0.9)

    homeBtn.on('pointerdown', () => {
      this.scene.launch('ConfirmModal', {
        confirmMsg: "Your Game Will be Ended\nAre you confirm?\nYou want to end the game\nand Go To Home Page",
        scene: this
      })
      this.scene.pause();
    });

    hamburgetBtn.on('pointerdown', () => {
      this.scene.launch('SettingsModal', { bgMusic: this.bgMusic, scene: this })
      this.scene.pause();
    });

  }

  update() {

    this.bg.tilePositionY -= 6;

    this.banana.y += 2;

    this.powerUpBlue.y += 1;

    this.showcaseObjects.forEach((object, index) => {
      this.showcaseObjects[0].y += 0.4;
      this.showcaseObjects[1].y += 1;
      this.showcaseObjects[2].y += 1.2;

      if (object.y > 800) {
        object.x = Phaser.Math.Between(0, 600);
        object.y = -120;
      }
    });

    if (this.banana.y > 600) {
      this.banana.body.enable = true;
      this.banana.enableBody(true, Phaser.Math.Between(50, 600), -50, true, true);
    }

    if (this.powerUpBlue.y > 3000) {
      this.powerUpBlue.body.enable = true;
      this.powerUpBlue.enableBody(true, Phaser.Math.Between(50, 600), -50, true, true);
    }

    if (this.cursors.left.isDown) {
      this.monkey.setVelocityX(-220);
    }
    else if (this.cursors.right.isDown) {
      this.monkey.setVelocityX(220);
    }
    else {
      this.monkey.setVelocityX(0);
    }

    this.asteroidsSprites.y += 2;
    rotationValue = rotationValue + 0.04;
    rotationValueForGranide = rotationValueForGranide + 1.8;
    this.asteroidsSprites.children.iterate(function (child) {

      child.setVelocityY(60)
      child.setRotation(rotationValue)
    });


    if (this.score >= 6) {

      this.alignTop2.setVelocityY(40)

      if (this.alignTop2.body.position.y >= 40) {
        this.alignTop2.setVelocityY(0)

        var distanceX = this.monkey.x - this.alignTop2.x;

        this.alignTop2.x += distanceX * 0.02;

        if (Phaser.Math.RoundTo(this.alignTop2.x, 0) == Phaser.Math.RoundTo(this.monkey.x, 0)) {
          if (!this.bombAlreadyMade) {
            this.grenadeBlue.rotation = 0;
            this.grenadeBlue.body.enable = true;
            this.grenadeBlue.enableBody(true, this.alignTop2.body.x + this.alignTop2.width / 2, this.alignTop2.body.y + this.alignTop2.height + 20, true, true, true);

            if (this.bombBodyEnabled === false) {
              this.physics.add.collider(this.monkey, this.grenadeBlue, () => {
                if (this.monkeyDeadOne) {
                  this.monkeyDeadFinally(this)
                } else {
                  this.grenadeBlue.disableBody(true, true)
                  this.explosionSound.play()
                  this.add.sprite(this.grenadeBlue.x, this.grenadeBlue.y + this.grenadeBlue.height / 2, 'boom').play('explode');
                  this.monkey.anims.play('dead1', true)
                  this.monkeyDeadOne = true;
                }


              }, null, this)

              this.bombBodyEnabled = true;
            }


            this.alignTop2.setVelocityX(0);

            this.waitTimer = this.time.delayedCall(5000, () => {
              this.doneWaitingForBombRotation = true;
              this.fallingBombSound.play()

            }, [], this);

            this.bombAlreadyMade = true;
            this.time.delayedCall(10000, () => {
              this.bombAlreadyMade = false;
              this.doneWaitingForBombRotation = false;

            }, [], this);
          }
        }

        if (this.doneWaitingForBombRotation) {
          this.grenadeBlue.rotation += 0.1;
          this.grenadeBlue.y += 2;
        }

        if (this.doneWaitingForBombRotation == false) {
          this.grenadeBlue.x = this.alignTop2.body.x + this.alignTop2.width / 2;
        }

      }
      this.alignTop2.setRotation(rotationValue)
    }
  }
}
function gameOver(scene, bgMusic, gameOverSound, Game) {
  bgMusic.pause();
  gameOverSound.play();
  scene.scene.pause();
  scene.anims.remove('fly');
  scene.anims.remove('dead1');
  scene.anims.remove('dead2');
  scene.scene.launch("YouLooseScene");
}

function gameWon(scene, bgMusic, levelCompleteSound) {
  scene.scene.pause();
  scene.anims.remove('fly');
  scene.anims.remove('dead1');
  scene.anims.remove('dead2');
  scene.scene.launch("YouWonScene", { nextLevel: "Level4", currentLevel: "Level3", bgMusic: bgMusic });
  bgMusic.pause();
  levelCompleteSound.play();
}


export default Level3;