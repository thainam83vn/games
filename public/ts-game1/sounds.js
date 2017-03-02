var Sounds = (function () {
    function Sounds() {
    }
    Sounds.playBackgroundMusic = function () {
        var music = SimpleGame.self.add.audio('boden');
        music.play();
    };
    Sounds.playExplosion = function () {
        var sound_boom = SimpleGame.self.add.audio('sound_boom');
        sound_boom.play();
    };
    return Sounds;
}());
//# sourceMappingURL=sounds.js.map