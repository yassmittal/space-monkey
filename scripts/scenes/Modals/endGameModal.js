class EndGameModal extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.setSize(scene.sys.game.config.width, scene.sys.game.config.height);

    this.modalBackground = scene.add.graphics();
    this.modalBackground.fillStyle(0x000000, 0.5);
    this.modalBackground.fillRect(0, 0, this.width, this.height);
    this.add(this.modalBackground);

    scene.add.existing(this);
  }
}
