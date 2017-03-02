var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SimpleGame = (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', {
            preload: function () {
                _this.gamePreload();
            },
            create: function () {
                _this.gameCreate();
            },
            update: function () {
                _this.gameUpdate();
            }
        }) || this;
        _this.EXPLOSION_SIZE = {
            Width: 64,
            Height: 64
        };
        _this.numBall = 1;
        return _this;
    }
    SimpleGame.prototype.gamePreload = function () {
        this.stage.backgroundColor = '#85b5e1';
        this.load.baseURL = 'https://examples.phaser.io/assets/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('player', 'sprites/phaser-dude.png');
        this.load.image('platform', 'sprites/platform.png');
        this.load.image('bomb', 'sprites/red_ball.png');
        this.load.atlasJSONHash('seacreatures', 'sprites/seacreatures_json.png', 'sprites/seacreatures_json.json');
        this.load.spritesheet('explosion', 'sprites/explosion.png', this.EXPLOSION_SIZE.Width, this.EXPLOSION_SIZE.Height);
        this.load.audio('sound_boom', ['audio/SoundEffects/explosion.mp3']);
        this.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    };
    SimpleGame.prototype.gameCreate = function () {
        Sounds.playBackgroundMusic();
        this.player = new Player();
        this.createHealth();
        this.updateHealth();
        this.bombs = new Bombs();
        this.victim = new Victim();
        this.platforms = this.add.physicsGroup();
        this.platforms.create(500, 150, 'platform');
        this.platforms.create(-200, 300, 'platform');
        this.platforms.create(400, 450, 'platform');
        this.platforms.setAll('body.immovable', true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.timer = this.time.create(false);
        this.timer.loop(500, this.updateBall, this);
        this.timer.start();
    };
    SimpleGame.prototype.gameUpdate = function () {
        this.bombs.collide();
        this.player.collide();
        this.victim.collide();
        this.player.move();
        this.updateHealth();
    };
    SimpleGame.prototype.updateBall = function () {
        for (var i = 0; i < this.numBall; i++) {
            this.bombs.create();
        }
        this.bombs.setGravity(500);
    };
    SimpleGame.prototype.createHealth = function () {
        this.textHealth = this.add.text(50, 50, 'health', {
            font: '20px Arial'
        });
        this.textHealth.fixToCamera = true;
    };
    SimpleGame.prototype.updateHealth = function () {
        this.textHealth.setText('life: ' + this.player.health);
    };
    SimpleGame.prototype.gameover = function () {
        this.player.kill();
        var dieText = this.add.text(this.camera.width / 2, this.camera.height / 2, 'Score: 0', {
            font: '48px Arial'
        });
        dieText.fixToCamera = false;
        dieText.setText('You died');
    };
    SimpleGame.prototype.win = function () {
        var dieText = this.add.text(this.camera.width / 2, this.camera.height / 2, 'Score: 0', {
            font: '48px Arial'
        });
        dieText.fixToCamera = false;
        dieText.setText('You won!!!!');
    };
    SimpleGame.prototype.render = function () {
    };
    return SimpleGame;
}(Phaser.Game));
SimpleGame.self = new SimpleGame();
window.onload = function () {
    var game = SimpleGame.self;
};
//# sourceMappingURL=app.js.map