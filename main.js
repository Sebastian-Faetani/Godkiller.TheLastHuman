import Preloader from "./assets/scenes/Preloader.js";
import Menu from "./assets/scenes/Menu.js";

import Level1 from "./assets/scenes/Level1.js";
import Level2 from "./assets/scenes/Level2.js";
import Level3 from "./assets/scenes/Level3.js";
import SecretLevel from "./assets/scenes/SecretLevel.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preloader, Menu, Level1, Level2, SecretLevel, Level3],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
