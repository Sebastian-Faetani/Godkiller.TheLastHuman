export default class Preloader extends Phaser.Scene {
  constructor() {

    super("Preloader");
  }

preload() {
  
  this.load.image("backGroundLvl1", "./assets/images/backGroundLvl1.png");
  this.load.image("platform1Lvl1", "./assets/images/platform1Lvl1.png");
  this.load.image("platform2Lvl1", "./assets/images/platform2Lvl1.png");
  this.load.image("platform3Lvl1", "./assets/images/platform3Lvl1.png");
  this.load.image("groundPlatformLvl1", "./assets/images/groundPlatformLvl1.png");
  this.load.image("menuBackground", "./assets/images/menuBackground.png");
  this.load.image("helpButton", "./assets/images/helpButton.png");
  this.load.image("creditsButton", "./assets/images/creditsButton.png");
  this.load.image("startButton", "./assets/images/startButton.png");
  this.load.image("buttonHover", "./assets/images/playerButtonHovered.png");
  this.load.video("helpScreen", "./assets/images/helpScreen.mp4");
  this.load.image("creditsScreen", "./assets/images/creditsScreen.png");
  this.load.image("magmaAttack", "./assets/images/magmaAttack.png");
  this.load.image("arrowUp", "./assets/images/arrowUp.png");
  this.load.image("musicOn", "./assets/images/musicOn.png");
  this.load.image("musicOff", "./assets/images/musicOff.png");
  this.load.image("exitButton", "./assets/images/exitButton.png");
  this.load.image("heartsSpriteFull", "./assets/images/heartsSpriteFull.png");
  this.load.image("heartsSpriteOneLeft", "./assets/images/heartsSpriteOneLeft.png");
  this.load.image("heartsSpriteDead", "./assets/images/heartsSpriteDead.png");
  this.load.image("retryButton", "./assets/images/retryButton.png");
  this.load.image("deathScreen", "./assets/images/deathScreen.png");

  this.load.spritesheet("player", "./assets/images/playerSpriteSheet.png", {
    frameWidth: 390,
    frameHeight: 650,
  });

}

create() {
  
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 2, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 6, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "upLeft",
    frames: [{ key: "player", frame: 11 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "upRight",
    frames: [{ key: "player", frame: 10 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "up",
    frames: [{ key: "player", frame: 12 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "dead",
    frames: this.anims.generateFrameNumbers("player", { start: 13, end: 29 }),
    frameRate: 10,
  });

  this.scene.start("menu");

}
}