class SimpleGame extends Phaser.Game {
    static self : SimpleGame = new SimpleGame();
    EXPLOSION_SIZE = {
        Width: 64,
        Height: 64
    };


    player: Player;
    platforms;
    bombs: Bombs;
    victim:Victim;

    cursors;
    jumpButton;
    timer;
    textHealth;

    numBall = 1;

    constructor() {
        super(800, 600, Phaser.AUTO, 'content', 
        { 
            preload: ()=>{
                this.gamePreload();
            }, 
            create: ()=>{
                this.gameCreate();
            },
            update: () => {
                this.gameUpdate();
            }
        });
    }

    gamePreload() {
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
    }

    gameCreate() {
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
    }    

    gameUpdate() {
        this.bombs.collide();
        this.player.collide();
        this.victim.collide();
        this.player.move();
       

        this.updateHealth();
    }    

    
    updateBall() {
        for (var i = 0; i < this.numBall; i++) {
            this.bombs.create();
        }
        this.bombs.setGravity(500);
    }

    createHealth() {
        this.textHealth = this.add.text(50, 50, 'health', {
            font: '20px Arial'
        });
        this.textHealth.fixToCamera = true;
    }

    updateHealth() {
        this.textHealth.setText('life: ' + this.player.health);
    }    


    gameover() {
        this.player.kill();
        var dieText : any = this.add.text(this.camera.width / 2, this.camera.height / 2, 'Score: 0', {
            font: '48px Arial'
        });
        dieText.fixToCamera = false;
        dieText.setText('You died');
    }

    win() {
        var dieText : any = this.add.text(this.camera.width / 2, this.camera.height / 2, 'Score: 0', {
            font: '48px Arial'
        });
        dieText.fixToCamera = false;
        dieText.setText('You won!!!!');
    }

    render() {

    }

}

window.onload = () => {

    var game = SimpleGame.self;

};