class TransitionScreen {
    constructor(game, gameOver) {
        Object.assign(this, {game, gameOver});

        this.elapsed = 0;

};

update() {
    this.elapsed += this.game.clockTick;
};

draw(ctx) {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

    ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2p"';

    ctx.fillStyle = "White";

    ctx.fillStyle = "White";

    if (this.gameOver) {
        
        ctx.fillText("You died.", 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
    }
    else {
        SceneManager.loadLevel(false, false);
    }
};
};