export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("backGroundLvl1", "./assets/images/backGroundLvl1.png");
    this.load.image("platform1Lvl1", "./assets/images/platform1Lvl1.png");
    this.load.image("platform2Lvl1", "./assets/images/platform2Lvl1.png");
    this.load.image("platform3Lvl1", "./assets/images/platform3Lvl1.png");
    this.load.image(
      "groundPlatformLvl1",
      "./assets/images/groundPlatformLvl1.png"
    );

    this.load.video("backGroundLvl2", "./assets/images/backGroundLvl2.mp4");
    this.load.image("trainLookLvl2", "./assets/images/trainLookLvl2.png");
    this.load.image("platform1Lvl2", "./assets/images/platform1Lvl2.png");
    this.load.image("platform2Lvl2", "./assets/images/platform2Lvl2.png");
    this.load.image(
      "groundPlatformLvl2",
      "./assets/images/groundPlatformLvl2.png"
    );

    this.load.video("backGroundLvl3", "./assets/images/backGroundLvl3.mp4");
    this.load.image("parallaxLvl3", "./assets/images/parallaxLvl3.png");
    this.load.image("platform1Lvl3", "./assets/images/platform1Lvl3.png");
    this.load.image("platform2Lvl3", "./assets/images/platform2Lvl3.png");
    this.load.image("platform3Lvl3", "./assets/images/platform3Lvl3.png");
    this.load.image(
      "groundPlatformLvl3",
      "./assets/images/groundPlatformLvl3.png"
    );

    this.load.image(
      "backGroundSecretLvl",
      "./assets/images/backGroundSecretLvl.png"
    );
    this.load.image(
      "platform1SecretLvl",
      "./assets/images/platform1SecretLvl.png"
    );
    this.load.image(
      "platform2SecretLvl",
      "./assets/images/platform2SecretLvl.png"
    );
    this.load.image(
      "groundPlatformSecretLvl",
      "./assets/images/groundPlatformSecretLvl.png"
    );

    this.load.image("menuBackground", "./assets/images/menuBackground.png");
    this.load.image("helpButton", "./assets/images/helpButton.png");
    this.load.image("creditsButton", "./assets/images/creditsButton.png");
    this.load.image("startButton", "./assets/images/startButton.png");
    this.load.image("buttonHover", "./assets/images/playerButtonHovered.png");
    this.load.video("helpScreen", "./assets/images/helpScreen.mp4");
    this.load.image("creditsScreen", "./assets/images/creditsScreen.png");

    this.load.image("magmaAttack", "./assets/images/magmaAttack.png");
    this.load.image("lightAttack", "./assets/images/lightAttack.png");
    this.load.image("electricAttack", "./assets/images/electricAttack.png");

    this.load.image("arrowUp", "./assets/images/arrowUp.png");
    this.load.image("arrowLeft", "./assets/images/arrowLeft.png");
    this.load.image("arrowDown", "./assets/images/arrowDown.png");
    this.load.image("nextLevelArrow", "./assets/images/nextLevelArrow.png");

    this.load.image("musicOn", "./assets/images/musicOn.png");
    this.load.image("musicOff", "./assets/images/musicOff.png");

    this.load.audio("menuMusic", "./assets/images/menuMusic.mp3");
    this.load.audio("level1Music", "./assets/images/level1Music.mp3");
    this.load.audio("level2Music", "./assets/images/level2Music.mp3");
    this.load.audio("level3Music", "./assets/images/level3Music.mp3");
    this.load.audio("secretLevelMusic", "./assets/images/secretLevelMusic.mp3");

    this.load.video("preloaderCutscene", "./assets/images/preloaderCutscene.mp4");
    this.load.video("loreCutscene", "./assets/images/loreCutscene.mp4");
    this.load.video("ending1Cutscene", "./assets/images/ending1Cutscene.mp4");

    this.load.image("heartsSpriteFull", "./assets/images/heartsSpriteFull.png");
    this.load.image("heartsSpriteOneLeft", "./assets/images/heartsSpriteOneLeft.png");
    this.load.image("heartsSpriteDead", "./assets/images/heartsSpriteDead.png");

    this.load.image("exitButton", "./assets/images/exitButton.png");
    this.load.image("retryButton", "./assets/images/retryButton.png");
    this.load.image("deathScreen", "./assets/images/deathScreen.png");

    this.load.image("blackBars", "./assets/images/blackBarsOfShame.png");
    this.load.image("blackBox", "./assets/images/blackBars.png");

    this.load.spritesheet("player", "./assets/images/playerSpriteSheet.png", {
      frameWidth: 390,
      frameHeight: 650,
    });

    this.load.spritesheet(
      "playerDeath",
      "./assets/images/deathSpriteSheet.png",
      {
        frameWidth: 390,
        frameHeight: 650,
      }
    );

    this.load.spritesheet("demon", "./assets/images/demonSpriteSheet.png", {
      frameWidth: 510,
      frameHeight: 740,
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
      frames: this.anims.generateFrameNumbers("playerDeath", {
        start: 0,
        end: 16,
      }),
      frameRate: 10,
      repeat: 1,
      hideOnComplete: false,
    });

    this.anims.create({
      key: "demonIdle",
      frames: this.anims.generateFrameNumbers("demon", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });

    let preloaderCutscene = this.add.video(400, 300, "preloaderCutscene").setInteractive();

    const scaleWidth = this.cameras.main.width / preloaderCutscene.width;
    const scaleHeight = this.cameras.main.height / preloaderCutscene.height;
    const scaleFactor = Math.min(scaleWidth, scaleHeight);

    preloaderCutscene.setScale(scaleFactor);

    preloaderCutscene.play() 

    preloaderCutscene.on('complete', () => {
      this.scene.start("menu");
    });

    preloaderCutscene.on('pointerdown', () => {
      this.scene.start("level3");
    });
    
  }
}
