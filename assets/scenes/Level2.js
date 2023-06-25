export default class Level1 extends Phaser.Scene {
  numLives;
  heartsFull;
  heartsHalf;
  deathScreen;
  retryButton;
  exitButton;
  constructor() {
    super("level2");
  }

  init() {
    this.playerSurvived = false;
    this.numLives = 3;
    this.isDemonEnabled = false;
  }

  create() {
    //Added BackGround
    let background = this.add.video(400, 300, "backGroundLvl2");
    background.play("loop");

    //add trainLook
    this.add.image(400, 386, "trainLookLvl2");

    //add ground
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 513, "groundPlatformLvl2").refreshBody().setDepth(1);

    //add magma attack
    this.magmaAttack = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    //add light attack
    this.lightAttack = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.nextLevelArrow = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.demon = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    //magma event
    this.time.addEvent({
      delay: 200,
      callback: this.addMagma,
      callbackScope: this,
      loop: true,
    });

    //light event
    this.time.addEvent({
      delay: 1000,
      callback: this.addLight,
      callbackScope: this,
      loop: true,
    });

    //add platforms
    platforms.create(143.5, 373, "platform1Lvl2").refreshBody();
    platforms.create(671.5, 373, "platform1Lvl2").refreshBody();
    platforms.create(400, 279, "platform2Lvl2").refreshBody();

    //adding player
    this.player = this.physics.add.sprite(400, 430, "player").setScale(0.1);
    this.player.setCollideWorldBounds(true);

    this.player.anims.play("idle", true);

    //add cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //add colliders
    this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(
      this.player,
      this.magmaAttack,
      this.characterHit.bind(this),
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.lightAttack,
      this.characterHit.bind(this),
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.nextLevelArrow,
      this.NextLevel,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.demon,
      this.secretLevel,
      null,
      this
    );

    //add timer
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    //add timer on screen
    this.timer = 15;
    this.timerText = this.add.text(720, 50, this.timer, {
      fontSize: "64px",
      fontFamily: "impact",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    //creat warning arrow
    this.arrowUp = this.add.image(0, 0, "arrowUp");
    this.arrowUp.visible = false;

    this.arrowLeft = this.add.image(0, 0, "arrowLeft");
    this.arrowLeft.visible = false;

    //add music
    this.level2Music = this.sound.add("level2Music", { loop: true , volume: 0.15 });
    this.level2Music.play();

    //Create Mute button
    let isMusicMuted = false;
    let musicOn = this.add
      .image(770, 530, "musicOn")
      .setInteractive()
      .setDepth(1);

    musicOn.on("pointerdown", () => {
      if (isMusicMuted) {
        this.level2Music.resume();
        musicOn.setTexture("musicOn");
        isMusicMuted = false;
      } else {
        this.level2Music.pause();
        musicOn.setTexture("musicOff");
        isMusicMuted = true;
      }
    });

    //add lifes
    this.heartsEmpty = this.add
      .image(100, 110, "heartsSpriteDead")
      .setScale(0.14)
      .setDepth(1);
    this.heartsHalf = this.add
      .image(100, 110, "heartsSpriteOneLeft")
      .setScale(0.14)
      .setDepth(1);
    this.heartsFull = this.add
      .image(100, 110, "heartsSpriteFull")
      .setScale(0.14)
      .setDepth(1);

    //add death screen and quit or restart
    this.deathScreen = this.add.image(400, 300, "deathScreen").setDepth(1);
    this.deathScreen.visible = false;

    this.retryButton = this.add
      .image(400, 300, "retryButton")
      .setInteractive()
      .setDepth(1);
    this.retryButton.visible = false;
    this.retryButton.on("pointerdown", () => {
      this.level2Music.stop();
      this.scene.restart();
    });

    this.exitButton = this.add
      .image(400, 350, "exitButton")
      .setInteractive()
      .setDepth(1);
    this.exitButton.visible = false;
    this.exitButton.on("pointerdown", () => {
      this.level2Music.stop();
      this.scene.start("menu");
    });

    //player invulnerable
    this.playerInvulnerable = false;

    this.playerDead = false;

    //add next level arrow
    this.nextLevelArrow.create(675, 425, "nextLevelArrow");
    this.nextLevelArrow.setVisible(false);

    //add secret level demon
    this.demon = this.demon
      .create(143.5, 333, "demon")
      .setScale(0.1)
      .refreshBody();
    this.demon.anims.play("demonIdle", true);
    this.demon.setVisible(false);
  }

  update() {
    // Player Movement
    if (this.numLives <= 1) {
      this.timer = stop;
      this.player.setVelocity(0, 0);
      if (this.numLives <= 0) {
        setTimeout(() => {
          this.player.anims.pause();
        }, 1600);
      } else if (this.numLives == 1) {
        this.player.anims.play("dead", true);
        this.numLives -= 1;
      }
      setTimeout(() => {
        this.playerDead = true;
        this.deathScreen.setVisible(true);
        this.retryButton.setVisible(true);
        this.exitButton.setVisible(true);
      });
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
      if (this.player.body.touching.down) {
        this.player.anims.play("left", true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
      if (this.player.body.touching.down) {
        this.player.anims.play("right", true);
      }
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.touching.down) {
        this.player.anims.play("idle", true);
      }
    }

    // Player Jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-550);
      if (this.cursors.left.isDown) {
        this.player.anims.play("upLeft", true);
      } else if (this.cursors.right.isDown) {
        this.player.anims.play("upRight", true);
      } else {
        this.player.anims.play("up", true);
      }
    }
  }

  //----------------------Magma Attack--------------------------------------------

  addMagma() {
    // Random x position
    const randomX = Phaser.Math.RND.between(50, 750);
    let magma;

    if (!this.lastX) {
      magma = this.createMagmaAttack(randomX);
    } else {
      let result = randomX - this.lastX;
      if (result < 65) {
        magma = this.createMagmaAttack(randomX);
      }
    }
    this.lastX = randomX;

    if (magma) {
      this.showAlertArrow(randomX, 430, () => {
        this.startMagmaAttack(magma);
      });
    }
  }

  createMagmaAttack(x) {
    const existingMagma = this.magmaAttack.getChildren();
    const overlappingMagma = existingMagma.find(
      (magma) => Math.abs(magma.x - x) < 65
    );

    if (!overlappingMagma) {
      const newMagma = this.magmaAttack
        .create(x, 680, "magmaAttack")
        .setScale(0.11)
        .setSize(590, 3200);

      return newMagma;
    }

    return null;
  }

  showAlertArrow(x, y, callback) {
    const flashDuration = 200; // Duration of each flash in milliseconds
    const totalFlashes = 2; // Total number of flashes
    let flashCount = 0;

    const flashArrow = () => {
      flashCount++;

      if (flashCount <= totalFlashes) {
        this.arrowUp.setPosition(x, y);
        this.arrowUp.setVisible(true);

        this.time.delayedCall(flashDuration, () => {
          this.arrowUp.setVisible(false);
          this.time.delayedCall(flashDuration, flashArrow);
        });
      } else {
        this.time.delayedCall(flashDuration, callback);
      }
    };

    flashArrow();
  }

  startMagmaAttack(magma) {
    const randomDuration = Phaser.Math.RND.between(700, 2000);
    const startY = 680;
    const targetY = 300;
    const duration = randomDuration;

    this.tweens.add({
      targets: magma,
      y: targetY,
      duration: duration,
      ease: "Linear",
      yoyo: true,
      onComplete: () => {
        magma.destroy();
      },
      loop: false,
    });
  }

  //----------------------------------------------------------------------------
  //----------------------Light Attack--------------------------------------------

  startLightAttack(light) {
    const randomDuration = Phaser.Math.RND.between(700, 2000);
    const startX = -70;
    const targetX = 850;
    const duration = randomDuration;

    this.tweens.add({
      targets: light,
      x: targetX,
      duration: duration,
      ease: "Linear",
      onComplete: () => {
        light.destroy();
      },
      loop: false,
    });
  }

  addLight() {
    // Random x position
    const randomY = Phaser.Math.RND.between(120, 450);
    let light;

    if (!this.lastY) {
      light = this.createLightAttack(randomY);
    } else {
      let result = randomY - this.lastY;
      if (result < 65) {
        light = this.createLightAttack(randomY);
      }
    }
    this.lastY = randomY;

    if (light) {
      this.showLeftAlertArrow(25, randomY, () => {
        this.startLightAttack(light);
      });
    }
  }

  showLeftAlertArrow(x, y, callback) {
    const flashDuration = 200; // Duration of each flash in milliseconds
    const totalFlashes = 2; // Total number of flashes
    let flashCount = 0;

    const flashArrow = () => {
      flashCount++;

      if (flashCount <= totalFlashes) {
        this.arrowLeft.setPosition(x, y);
        this.arrowLeft.setVisible(true);

        this.time.delayedCall(flashDuration, () => {
          this.arrowLeft.setVisible(false);
          this.time.delayedCall(flashDuration, flashArrow);
        });
      } else {
        this.time.delayedCall(flashDuration, callback);
      }
    };

    flashArrow();
  }

  createLightAttack(y) {
    const existingLight = this.lightAttack.getChildren();
    const overlappingLight = existingLight.find(
      (light) => Math.abs(light.y - y) < 65
    );

    if (!overlappingLight) {
      const newLight = this.lightAttack
        .create(-70, y, "lightAttack")
        .setScale(0.11)
        .setSize(990, 330);

      return newLight;
    }

    return null;
  }

  //---------------------------------------------------------------

  characterHit() {
    if (!this.playerInvulnerable) {
      this.numLives--;

      if (this.numLives === 2) {
        this.heartsFull.setVisible(false);
      } else if (this.numLives === 1) {
        this.heartsHalf.setVisible(false);
        this.playerDead = true;
      }
      this.playerInvulnerable = true;
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.playerInvulnerable = false;
        },
        callbackScope: this,
        loop: false,
      });
    }
  }

  NextLevel(player, nextLevelArrow) {
    if (this.isNextLevelEnabled) {
      this.level2Music.stop();
      this.scene.start("level3");
    }
  }

  secretLevel(player, nextLevelArrow) {
    if (this.isDemonEnabled) {
      this.level2Music.stop();
      this.scene.start("secretLevel");
    }
  }

  showNextLevelArrow() {
    this.nextLevelArrow.setVisible(this.isNextLevelEnabled);
  }

  showDemon() {
    this.demon.setVisible(this.isDemonEnabled);
  }

  onSecond() {
    this.timer--;
    this.timerText.setText(this.timer);
    if (this.timer <= 10) {
      this.isDemonEnabled = true;
      this.showDemon();
      if (this.timer <= 5) {
        this.isDemonEnabled = false;
        this.showDemon();
      }
    }
    if (this.timer <= 0) {
      this.playerSurvived = true;
      this.magmaAttack.clear(true, true);
      this.time.removeAllEvents();
      this.isNextLevelEnabled = true;
      this.showNextLevelArrow();
    }
  }
}
