export default class Level1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("level1");
  }

  init() {
    
  }

  create() {
    
    //Added BackGround
    this.add.image(400, 300, "backGroundLvl1");

    //adding platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 513, "groundPlatformLvl1").refreshBody();
    platforms.create(126, 383, "platform1Lvl1").refreshBody();
    platforms.create(392, 295, "platform2Lvl1").refreshBody();
    platforms.create(661, 268, "platform3Lvl1").refreshBody();

    //adding player
    this.player = this.physics.add.sprite(400, 300, "player");
    this.player.setCollideWorldBounds(true);

    //play idle animation
    this.player.anims.play("idle", true);

    //add colliders
    this.physics.add.collider(this.player, platforms);


  }

  update() {
   
  }
}
