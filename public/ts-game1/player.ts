class Player  {
    sprite: Phaser.Sprite;
    health: number = 10;

    constructor(){
        this.sprite = SimpleGame.self.add.sprite(700, 800, 'seacreatures');        
        this.sprite.animations.add('swim', Phaser.Animation.generateFrameNames('crab', 10000, 10025, '', 5), 30, true);
        this.sprite.animations.play('swim', 15, true);
        SimpleGame.self.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
    }

    body(): any{
        return this.sprite.body;
    }

    kill(){
        this.sprite.kill();
    }

    collide(){
        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.player.sprite, 
            SimpleGame.self.platforms);

        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.player.sprite, 
            SimpleGame.self.victim.sprite,
            ()=>{
                SimpleGame.self.win();
            });            
    }

    move(){
        this.body().velocity.x = 0;

        if (SimpleGame.self.cursors.left.isDown) {
            this.body().velocity.x = -250;
        } else if (SimpleGame.self.cursors.right.isDown) {
            this.body().velocity.x = 250;
        }

        if (SimpleGame.self.jumpButton.isDown && (this.body().onFloor() || this.body().touching.down)) {
            this.body().velocity.y = -400;
        }
    }

}