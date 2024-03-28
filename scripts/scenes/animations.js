const createAnimations = (scene) => {
  scene.anims.create({
    key: 'fly',
    frames: scene.anims.generateFrameNames('monkey', {
      start: 1,
      end: 2,
      prefix: "spacemonkey_fly0",
      suffix: ".png"
    }),
    frameRate: 4,
    repeat: -1,
  });

  scene.anims.create({
    key: 'dead1',
    frames: [{ key: "monkey", frame: "spacemonkey_dead01.png" }],
    repeat: -1
  })

  scene.anims.create({
    key: 'dead2',
    frames: [{ key: "monkey", frame: "spacemonkey_dead02.png" }],
    repeat: -1
  })

  scene.anims.create({
    key: 'explode',
    frames: scene.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
    frameRate: 20,
  })
};

export default createAnimations;
