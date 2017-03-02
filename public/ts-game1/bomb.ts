class Bomb {
    EXPLOSION_SIZE = {
        Width: 64,
        Height: 64
    };
    sprite: Phaser.Sprite;
    constructor(sprite: Phaser.Sprite){
        this.sprite = sprite;
        this.sprite.data = this;
    }

    kill(){
        var explosion = SimpleGame.self.add.sprite(
            this.sprite.x - this.EXPLOSION_SIZE.Width / 2, this.sprite.y - this.EXPLOSION_SIZE.Height / 2, 'explosion');                
        explosion.animations.add('boom', null, 30, true);
        explosion.animations.play('boom', 15, false);
        Sounds.playExplosion();
    
        setTimeout(() => {
            explosion.kill();
        }, 1000);
        this.sprite.kill();
    }
}

class Bombs  {
    group: Phaser.Group;
    constructor(){
        this.group = SimpleGame.self.add.physicsGroup();
    }

    create(): Bomb{
        var x = SimpleGame.self.rnd.integerInRange(100, 700);
        var bomb = this.group.create(x, 0, 'bomb');
        bomb.body.collideWorldBounds = true;
        return new Bomb(bomb);
    }

    setGravity(gravity: number){
        this.group.setAll('body.gravity.y', gravity);
    }

    collide(){
        // SimpleGame.self.physics.arcade.collide(this.victim, this.platforms);
        // this.physics.arcade.collide(this.victim, this.player, ()=>{
        //     this.win();
        // });

        
        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.platforms, 
            SimpleGame.self.bombs.group, 
            (platform: Phaser.Sprite, bomb: Phaser.Sprite)=>{
            this.kill(bomb);
        });
        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.victim.sprite, 
            SimpleGame.self.bombs.group,
            (platform: Phaser.Sprite, bomb: Phaser.Sprite)=>{
            this.kill(bomb);
        });        
        SimpleGame.self.physics.arcade.collide(
            SimpleGame.self.player.sprite, 
            SimpleGame.self.bombs.group,
            (player, bomb)=>{
                this.kill(bomb);
                SimpleGame.self.player.health--;
                if (SimpleGame.self.player.health <= 0)
                    SimpleGame.self.gameover();                                
            }            
        );        

        for(var i = 0; i < this.group.length; i++){
            var bomb: any = this.group.getChildAt(i);            
            if (bomb.alive && bomb.body.onFloor()){                 
                this.kill(bomb);
            }
        }


    }

    kill(bomb: Phaser.Sprite){
        var bombCon: Bomb = bomb.data;
        bombCon.kill();
    }
}