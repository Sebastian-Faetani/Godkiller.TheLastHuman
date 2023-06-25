export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    this.add.image(400, 300, "menuBackground");
    let startButton = this.add.image(400, 325, "startButton").setInteractive();
    let helpButton = this.add.image(100, 550, "helpButton").setInteractive();
    let creditsButton = this.add
      .image(690, 550, "creditsButton")
      .setInteractive();
    let menuMusic = this.sound.add("menuMusic", { loop: true , volume: 0.15 });
    menuMusic.play();
    let helpScreen = this.add.video(400, 300, "helpScreen").setInteractive();
    let creditsScreen = this.add
      .image(400, 300, "creditsScreen")
      .setInteractive();
    helpScreen.visible = false;
    creditsScreen.visible = false;

    //Start button
    startButton.on("pointerover", () => {
      startButton.setTexture("buttonHover");
    });

    startButton.on("pointerdown", () => {
      menuMusic.stop();
      this.scene.start("level1");
    });

    startButton.on("pointerout", () => {
      startButton.setTexture("startButton");
    });

    //help button
    helpButton.on("pointerdown", () => {
      helpScreen.visible = true;
      helpScreen.play("loop");
    });

    helpScreen.on("pointerdown", () => {
      helpScreen.visible = false;
      helpScreen.stop();
    });

    //credits button
    creditsButton.on("pointerdown", () => {
      creditsScreen.visible = true;
    });

    creditsScreen.on("pointerdown", () => {
      creditsScreen.visible = false;
    });
  }

  update() {}
}
