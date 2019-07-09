export default {
  // ...
  type: Phaser.AUTO,
  physics: {
    // Specify physics engine and configuration
    default: 'arcade', // A simple and performant physics engine
    arcade: {
      gravity: { y: 1500 }, // Game objects will be pulled down along the y-axis
      // The number 1500 is arbitrary. The higher, the stronger the pull.
      // A negative value will pull game objects up along the y-axis
      debug: false, // Whether physics engine should run in debug mode
    },
  },
  // ...
};
