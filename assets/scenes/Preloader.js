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

  this.load.spritesheet("player", "./assets/images/playerSpriteSheet.png", {
    frameWidth: 39,
    frameHeight: 65,
  });

  this.load.spritesheet("magmaAttack", "./assets/images/magmaAttackSpriteSheet.png", {
    frameWidth: 59,
    frameHeight: 337,
  });

}

create() {
  
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 4, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "upLeft",
    frames: [{ key: "player", frame: 7 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "upRight",
    frames: [{ key: "player", frame: 6 }],
    frameRate: 20,
  });

  this.scene.start("level1");

}
}