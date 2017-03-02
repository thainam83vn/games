class Victim {
    sprite: Phaser.Sprite;
    constructor(){
        this.sprite = SimpleGame.self.add.sprite(700, -400, 'seacreatures');
        this.sprite.animations.add('swim', Phaser.Animation.generateFrameNames('seahorse', 0, 5, '', 4), 30, true);
        this.sprite.animations.play('swim', 15, true);
        SimpleGame.self.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
    }

    collide(){
        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.victim.sprite, 
            SimpleGame.self.platforms);
    }
}