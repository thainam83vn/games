/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/nFWgHXil
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'https://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/red_ball.png');
    game.load.atlasJSONHash('seacreatures', 'sprites/seacreatures_json.png', 'sprites/seacreatures_json.json');
    game.load.spritesheet('explosion', 'sprites/explosion.png', 128, 128);

}

var player;
var platforms;
var explosions;
var cursors;
var jumpButton;
var timer;
var textHealth;
var health = 10;

var numBall = 1;

function updateBall() {
    for (var i = 0; i < numBall; i++) {
        createBall();
    }
    platforms.setAll('body.gravity.y', 500);
}

function createBall() {
    var x = game.rnd.integerInRange(100, 700);
    var ball = platforms.create(x, 0, 'platform');

}

function createHealth() {
    textHealth = game.add.text(50, 50, 'health', { font: '10px Arial' });
    textHealth.fixToCamera = true;
}

function updateHealth() {
    textHealth.setText('life: ' + health);
}

function createBot() {
    var bot = game.add.sprite(200, 200, 'seacreatures');
    bot.animations.add('swim', Phaser.Animation.generateFrameNames('crab', 10000, 10025, '', 5), 30, true);
    bot.animations.play('swim', 15, true);
    game.physics.arcade.enable(bot);
    bot.body.collideWorldBounds = true;
    bot.body.gravity.y = 500;
    return bot;
}

function create() {
    player = createBot();
    createHealth();
    updateHealth();

    platforms = game.add.physicsGroup();
    explosions = game.add.physicsGroup();



    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    timer = game.time.create(false);
    timer.loop(500, updateBall, this);
    timer.start();
}



function onCollide(p, ball) {
    //var explosion = explosions.create(ball.x, ball.y);
    //explosion.animations.add('explosion');
    //explosion.play('explosion', 30, false, true);

    ball.kill();

    health--;
    if (health <= 0)
        gameover();
}

function update() {

    var collide = game.physics.arcade.collide(player, platforms, onCollide);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -250;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
        player.body.velocity.y = -400;
    }

    updateHealth();
}


function gameover() {
    player.kill();
    var dieText = game.add.text(game.camera.width / 2, game.camera.height / 2, 'Score: 0', { font: '48px Arial' });
    dieText.fixToCamera = false;
    dieText.setText('You died');
}

function render() {

}