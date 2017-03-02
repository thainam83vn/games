var Player = (function () {
    function Player() {
        this.health = 10;
        this.sprite = SimpleGame.self.add.sprite(700, 800, 'seacreatures');
        this.sprite.animations.add('swim', Phaser.Animation.generateFrameNames('crab', 10000, 10025, '', 5), 30, true);
        this.sprite.animations.play('swim', 15, true);
        SimpleGame.self.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
    }
    Player.prototype.body = function () {
        return this.sprite.body;
    };
    Player.prototype.kill = function () {
        this.sprite.kill();
    };
    Player.prototype.collide = function () {
        SimpleGame.self.physics.arcade.collide(SimpleGame.self.player.sprite, SimpleGame.self.platforms);
        SimpleGame.self.physics.arcade.collide(SimpleGame.self.player.sprite, SimpleGame.self.victim.sprite, function () {
            SimpleGame.self.win();
        });
    };
    Player.prototype.move = function () {
        this.body().velocity.x = 0;
        if (SimpleGame.self.cursors.left.isDown) {
            this.body().velocity.x = -250;
        }
        else if (SimpleGame.self.cursors.right.isDown) {
            this.body().velocity.x = 250;
        }
        if (SimpleGame.self.jumpButton.isDown && (this.body().onFloor() || this.body().touching.down)) {
            this.body().velocity.y = -400;
        }
    };
    return Player;
}());
//# sourceMappingURL=player.js.map