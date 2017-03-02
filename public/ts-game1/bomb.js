var Bomb = (function () {
    function Bomb(sprite) {
        this.EXPLOSION_SIZE = {
            Width: 64,
            Height: 64
        };
        this.sprite = sprite;
        this.sprite.data = this;
    }
    Bomb.prototype.kill = function () {
        var explosion = SimpleGame.self.add.sprite(this.sprite.x - this.EXPLOSION_SIZE.Width / 2, this.sprite.y - this.EXPLOSION_SIZE.Height / 2, 'explosion');
        explosion.animations.add('boom', null, 30, true);
        explosion.animations.play('boom', 15, false);
        Sounds.playExplosion();
        setTimeout(function () {
            explosion.kill();
        }, 1000);
        this.sprite.kill();
    };
    return Bomb;
}());
var Bombs = (function () {
    function Bombs() {
        this.group = SimpleGame.self.add.physicsGroup();
    }
    Bombs.prototype.create = function () {
        var x = SimpleGame.self.rnd.integerInRange(100, 700);
        var bomb = this.group.create(x, 0, 'bomb');
        bomb.body.collideWorldBounds = true;
        return new Bomb(bomb);
    };
    Bombs.prototype.setGravity = function (gravity) {
        this.group.setAll('body.gravity.y', gravity);
    };
    Bombs.prototype.collide = function () {
        // SimpleGame.self.physics.arcade.collide(this.victim, this.platforms);
        // this.physics.arcade.collide(this.victim, this.player, ()=>{
        //     this.win();
        // });
        var _this = this;
        SimpleGame.self.physics.arcade.collide(SimpleGame.self.platforms, SimpleGame.self.bombs.group, function (platform, bomb) {
            _this.kill(bomb);
        });
        SimpleGame.self.physics.arcade.collide(SimpleGame.self.victim.sprite, SimpleGame.self.bombs.group, function (platform, bomb) {
            _this.kill(bomb);
        });
        SimpleGame.self.physics.arcade.collide(SimpleGame.self.player.sprite, SimpleGame.self.bombs.group, function (player, bomb) {
            _this.kill(bomb);
            SimpleGame.self.player.health--;
            if (SimpleGame.self.player.health <= 0)
                SimpleGame.self.gameover();
        });
        for (var i = 0; i < this.group.length; i++) {
            var bomb = this.group.getChildAt(i);
            if (bomb.alive && bomb.body.onFloor()) {
                this.kill(bomb);
            }
        }
    };
    Bombs.prototype.kill = function (bomb) {
        var bombCon = bomb.data;
        bombCon.kill();
    };
    return Bombs;
}());
//# sourceMappingURL=bomb.js.map