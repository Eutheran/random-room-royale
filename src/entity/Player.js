import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.playedSound = false;
    this.facingLeft = false;
  }

  updateMovement(cursors) {
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-220);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(220);

      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.down.isDown) {
      this.play('crouch', true);
      this.setVelocityX(0);
    } else {
      this.setVelocityX(0);
      this.play('idle', true);
    }
  }

  updateInAir() {
    if (!this.body.touching.down) {
      this.play('jump');
    }
  }
  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-650);
      jumpSound.play();
    }
  }

  update(cursors, jumpSound, deathSound) {
    if (this.y > 625 && !this.playedSound) {
      this.playedSound = true;
      deathSound.play();
    }
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);

    this.updateInAir();
  }
}
