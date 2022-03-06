// class TransitionScreen {
//     constructor(game, gameOver, num) {
//         Object.assign(this, {game, gameOver, num});
//         this.elapsed = 0;

// };

// update() {
//     this.elapsed += this.game.clockTick;
// };

// draw(ctx) {
//     ctx.fillStyle = "Black";
//     ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

//     ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2p"'; 

//     ctx.fillStyle = "White";

//     ctx.fillStyle = "White";

//     if (this.gameOver) {
        
//         if (this.num == 0) {
//             ctx.fillText("You died.", 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
//         }
//         else {
//             ctx.fillText("You Won!.", 5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
//         }
//     }
//     else {
//         SceneManager.loadLevel(this.level, false, false);
//     }
// };
// };

class TransitionScreen {
    constructor(game, level, gameOver, win) {
        Object.assign(this, { game, level, gameOver, win });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.game.click) {
            if (this.game.mouse && this.game.mouse.y > 340 && this.game.mouse.y < 350) {
                main();
            }
        }
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.textAlign = "Center";

        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';


        
        if (this.gameOver) {
            if (this.win == false) {
                ctx.fillStyle = "White";
                ctx.fillText("GAME OVER", 350, 350);
                ctx.fillStyle = "Red";
                ctx.fillText("Play again?", 350, 500);
            } else {
                ctx.fillStyle = "White";
                ctx.fillText("YOU SUCCESSFULLY ESCAPE THE MANSION", 350, 350);
                ctx.fillStyle = "Red";
                ctx.fillText("Play again?", 350, 450);
            }
        } else {
            ctx.fillText("LEVEL " + this.level, 16 * PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
            // ctx.fillText(this.game.camera.levelLabel, 16 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
            // ctx.drawImage(ASSET_MANAGER.getAsset("./image/spritesheet.png"), 0, 880, 80, 80, 14 * PARAMS.BLOCKWIDTH, 14 * PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH);
        }
    };
};