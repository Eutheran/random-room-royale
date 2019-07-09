/** @type {import("../typings/phaser")} */

// Bring in all the scenes
import 'phaser';
import MainScene from './scenes/MainScene';
import BgScene from './scenes/BgScene';
import FgScene from './scenes/FgScene';
import config from './config/config';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('BgScene', BgScene);
    this.scene.add('FgScene', FgScene);
    this.scene.add('MainScene', MainScene);

    this.scene.start('MainScene');
  }
}

window.onload = function() {
  window.game = new Game();
};
