class Spell {
    constructor(game, x, y, target, spritesheet) {
        Object.assign(this, {game, x, y, target, spritesheet});     

        var dist = distance(this, this.target);

        this.cache = [];

        this.animations = [];

        this.animations.push([]);

        this.animations[0].push([]);
        this.animations[0][0] = new Animator(this.spritesheet, 0, 1079, 132, 57, 4, 0.2);

        this.elapsedTime = 0;
    };

    update() {

    };

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    };

};