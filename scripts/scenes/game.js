import YouWonScene from "./youWonScene.js";

let rotationValue = 0;
let rotationValueForGranide = 0;
class Game extends Phaser.Scene {

  constructor() {
    super({
      key: "Game"
    })
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

    this.load.image('banana', "./assets/tackels/powerup_banana.png")
    this.load.image('powerUpBlue', "./assets/tackels/powerup_blue.png")
    this.load.image('powerUpRed', "./assets/tackels/powerup_red.png")



    this.load.image('alienSideGreen', "./assets/objects/enemies/alien_side_green.png")
    this.load.image('alignTop1', "./assets/objects/enemies/alien_top_01.png")
    this.load.image('alignTop2', "./assets/objects/enemies/alien_top_02.png")

    this.load.image('grenadeBlue', "./assets/tackels/object_grenade_blue.png")

    this.load.image('spaceFlier', "./assets/objects/spaceFlier/spaceflier_01_a.png")


    this.load.audio('bgMusic', './assets/sounds/backgroundMusic.mp3');
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

    const bgMusic = this.sound.add('bgMusic');
    const achievementSound = this.sound.add('achievement');
    const powerUpSound = this.sound.add('powerUp');
    this.explosionSound = this.sound.add('explosion')
    const gameOverSound = this.sound.add('gameOver')
    const levelCompleteSound = this.sound.add('levelComplete')
    this.fallingBombSound = this.sound.add('fallingBomb')


    bgMusic.play()
    bgMusic.loop = true;
    this.score = 0;
    this.bombAlreadyMade = false;
    this.bombBodyEnabled = false;
    this.doneWaitingForBombRotation = false;


    this.bg = this.add.tileSprite(0, 0, width * 5 / 2, height * 5 / 2, 'background').setOrigin(0, 0).setScale(0.4);

    this.alignTop2 = this.physics.add.sprite(100, -70, 'alignTop2');


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
    // this.boom = this.add.sprite(300, 300, 'boom');


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
      // repeat: -1
    })



    this.monkey.anims.play('fly', true)

    this.physics.add.collider(this.monkey, this.asteroidsSprites, (child, otherObject) => {

      if (this.monkeyDeadOne) {
        this.monkey.anims.play('dead2', true)
        this.monkeyDeadOne = false;
        this.explosionSound.play()
        gameOver(this, bgMusic, gameOverSound)
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

      if (this.score >= 30) {
        gameWon(this, bgMusic, levelCompleteSound)
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


    if (this.score >= 1) {

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
                this.grenadeBlue.disableBody(true, true)
                this.explosionSound.play()
                this.add.sprite(this.grenadeBlue.x, this.grenadeBlue.y + this.grenadeBlue.height / 2, 'boom').play('explode');
                this.monkey.anims.play('dead1', true)
                this.monkeyDeadOne = true;

              }, null, this)

              this.bombBodyEnabled = true;
            }

            this.alignTop2.setVelocityX(0);

            this.waitTimer = this.time.delayedCall(5000, () => {
              this.doneWaitingForBombRotation = true;
              // this.bombAlreadyMade = false;
              this.fallingBombSound.play()

              // this.waitTimer2 = this.time.delayedCall(10000, () => {
              //   this.doneWaitingForBombRotation = false;
              //   this.bombAlreadyMade = false;
              //   console.log('waited for 10 seconds')
              // }, [], this);

            }, [], this);

            this.bombAlreadyMade = true;
            this.time.delayedCall(10000, () => {
              // this.doneWaitingForBombRotation = false;
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
function gamedOver(scene, bgMusic, gameOverSound, Game) {
  bgMusic.pause()
  gameOverSound.play()
  button.setInteractive({ useHandCursor: true });
  button.inputEnabled = true;

  button.on('pointerdown', () => {
    restartGame(scene)
  });

  const restartText = scene.add.text(button.x, button.y, 'Restart').setOrigin(0.5, 0.5);
  scene.scene.pause(Game);

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
  scene.scene.launch("YouWonScene");
  bgMusic.pause();
  levelCompleteSound.play();
}

function restartGame(scene) {
  scene.scene.resume();
}




export default Game;