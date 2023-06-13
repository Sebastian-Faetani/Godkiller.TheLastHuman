export default class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
  }

  init() {
      this.playerSurvived = false;


  }

  create() {
    
    //Added BackGround
    this.add.image(400, 300, "backGroundLvl1");

    //add ground
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 513, "groundPlatformLvl1").refreshBody().setDepth(1);

    //add magma attack
    this.magmaAttack = this.physics.add.staticGroup();
    
    //magma event
    this.time.addEvent({
      delay: 1000,
      callback: this.addMagma,
      callbackScope: this,
      loop: true,
    });


    //add platforms
    platforms.create(126, 383, "platform1Lvl1").refreshBody();
    platforms.create(392, 295, "platform2Lvl1").refreshBody();
    platforms.create(661, 268, "platform3Lvl1").refreshBody();

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
      // this.magmaKill(),
      // null,
      // this
      );

    //add timer
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    //add timer on screen
    this.timer = 60;
    this.timerText = this.add.text(720, 50, this.timer, {
      fontSize: "64px",
      fontFamily: "impact",
      fontStyle: "bold",
      fill: "#FFFFFF",
    });

    //creat warning arrow
    this.arrowUp = this.add.image(0, 0, "arrowUp");
    this.arrowUp.visible = false;

    //Create Pause Menu
      let pauseMenu = this.add.image(400, 300, "pauseMenu").setInteractive().setDepth(1);
      let continueButton = this.add.image(400, 230, "continueButton").setInteractive().setDepth(1);
      let muteButtonOn = this.add.image(410, 290, "muteButtonOn").setInteractive().setDepth(1);
      let exitButton = this.add.image(400, 370, "exitButton").setInteractive().setDepth(1);

      pauseMenu.visible = false;
      continueButton.visible = false;
      muteButtonOn.visible = false;
      exitButton.visible = false;

      this.input.keyboard.on("keydown", function (event) {
        if (event.key === "Escape") {
          this.scene.pause();
          pauseMenu.visible = true;
          continueButton.visible = true;
          muteButtonOn.visible = true;
          exitButton.visible = true;

        }
      }, this);
      
      continueButton.on("pointerdown", () => {
        pauseMenu.visible = false;
        continueButton.visible = false;
        muteButtonOn.visible = false;
        exitButton.visible = false;
        this.scene.resume();
        }, this);

  }

 
  update() {
    // Player Movement
    if (this.cursors.left.isDown) {
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

  addMagma() {
   //random x position
   const randomX = Phaser.Math.RND.between(50, 750);

   const magma = this.magmaAttack.create(randomX, 680, "magmaAttack").setScale(0.11).setSize(59, 2000);

  //arrow appears above magma attack
  const showAlertArrow = () => {
    const flashDuration = 200; // Duration of each flash in milliseconds
    const totalFlashes = 2; // Total number of flashes
    let flashCount = 0;

    const flashArrow = () => {
      flashCount++;

      if (flashCount <= totalFlashes) {
        this.arrowUp.setPosition(randomX, 450);
        this.arrowUp.setVisible(true);

        this.time.delayedCall(flashDuration, () => {
          this.arrowUp.setVisible(false);
          this.time.delayedCall(flashDuration, flashArrow);
        });
      } else {
        this.time.delayedCall(flashDuration, () => {
          // Start magma attack after arrow finishes flashing
          this.startMagmaAttack(magma);
        });
      }
    };

    flashArrow();
  };

  showAlertArrow();

  }    

  startMagmaAttack(magma) {
    const startY = 680;
    const targetY = 300;
    const duration = 3000;
  
    this.tweens.add({
      targets: magma,
      y: targetY,
      duration: duration / 2,
      ease: "Linear",
      onComplete: () => {
        this.tweens.add({
          targets: magma,
          y: startY,
          duration: duration / 2,
          ease: "Linear",
          onComplete: () => {
            magma.destroy();
          },
        });
      },
      loop: false,
    });
  }
  
    onSecond() {
      this.timer--;
      this.timerText.setText(this.timer);
      if (this.timer <= 0) {
        this.playerSurvived = true;
      }
    }
    
  }


