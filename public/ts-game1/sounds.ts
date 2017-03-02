class Sounds {
    public static playBackgroundMusic(){
        var music = SimpleGame.self.add.audio('boden');
        music.play();
    }

    public static playExplosion(){
        var sound_boom = SimpleGame.self.add.audio('sound_boom');
        sound_boom.play();
    }
}