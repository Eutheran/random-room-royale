export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image('cityscape', 'assets/backgrounds/background.png');
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add
      .image(-160, 0, 'cityscape')
      .setOrigin(0)
      .setScale(0.75);
  }
}
