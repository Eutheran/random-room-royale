import Platform from '../entity/platform';
import Player from '../entity/Player';
const color = require('randomcolor');

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.state = {};
  }

  createPlatform(x, y) {
    this.platformGroup.create(x, y, 'platform');
  }
  createJumpstep(x, y) {
    this.platformGroup.create(x, y, 'jumpstep');
  }

  preload() {
    this.load.image('mainPlatform', 'assets/sprites/main_platform.png');
    this.load.image('platform', 'assets/sprites/single_platform.png');
    this.load.image('jumpstep', 'assets/sprites/jumpstep.png');
    this.load.spritesheet('yoshi', 'assets/spriteSheets/yoshi.png', {
      frameWidth: 32,
      frameHeight: 35,
    });

    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('death', 'assets/audio/death.wav');
    this.load.audio('bgmusic', 'assets/audio/bgmusic.mp3', {
      instances: 2,
    });
  }

  create() {
    this.jumpSound = this.sound.add('jump');
    this.deathSound = this.sound.add('death');
    let bgMusic = this.sound.add('bgmusic');
    bgMusic.play({
      volume: 0.5,
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createAnimations();

    this.platformGroup = this.physics.add.staticGroup({ classType: Platform });

    //top side platforms
    this.createJumpstep(300, 170);
    this.createJumpstep(140, 270);
    this.createPlatform(880, 230);
    this.createPlatform(565, 120);

    //bottom side platforms
    this.createPlatform(100, 520);
    this.createPlatform(405, 635);
    this.createJumpstep(900, 485);
    this.createJumpstep(705, 605);

    this.platformGroup.create(500, 400, 'mainPlatform');

    this.player = new Player(this, 320, 250, 'yoshi').setScale(1.8);
    this.player.setTint(0x0ff01);
    // this.player.setTint(color)

    this.physics.add.collider(this.player, this.platformGroup);
  }

  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('yoshi', { start: 3, end: 6 }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'yoshi', frame: 15 }, { key: 'yoshi', frame: 16 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'crouch',
      frames: [{ key: 'yoshi', frame: 18 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'yoshi', frame: 29 }],
      frameRate: 5,
    });
  }

  update(time, delta) {
    this.player.update(this.cursors, this.jumpSound, this.deathSound);
  }
}
