class TransitionScreen {
    constructor(game, level, gameOver, win) {
        Object.assign(this, { game, level, gameOver, win });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.gameOver && this.game.click) {
            if (this.game.mouse && this.game.mouse.y > 435 && this.game.mouse.y < 450) {
                let gameEngine = new GameEngine();

                let ASSET_MANAGER = new AssetManager();

                this.gameOver = false;
                

                // sprites
                ASSET_MANAGER.queueDownload("./sprites/battery_life.png");
                ASSET_MANAGER.queueDownload("./sprites/health_bar.png");
                ASSET_MANAGER.queueDownload("./sprites/frame_light.png");
                ASSET_MANAGER.queueDownload("./sprites/frame_no_light.png");
                ASSET_MANAGER.queueDownload("./sprites/title.png");
                ASSET_MANAGER.queueDownload("./sprites/fireplace.png");
                ASSET_MANAGER.queueDownload("./sprites/door1.png");
                ASSET_MANAGER.queueDownload("./sprites/masterKey.png");
                ASSET_MANAGER.queueDownload("./sprites/doorsmirror.png");
                ASSET_MANAGER.queueDownload("./sprites/character.png");
                ASSET_MANAGER.queueDownload("./sprites/zombie1.png");
                ASSET_MANAGER.queueDownload("./sprites/witch.png");
                ASSET_MANAGER.queueDownload("./sprites/floor.png");
                ASSET_MANAGER.queueDownload("./sprites/wall.png");
                ASSET_MANAGER.queueDownload("./sprites/dark-wood.png");
                ASSET_MANAGER.queueDownload("./sprites/extra.png");
                ASSET_MANAGER.queueDownload("./sprites/stairs.png");
                ASSET_MANAGER.queueDownload("./sprites/upholstery.png");


                ASSET_MANAGER.downloadAll(function () {
                    var canvas = document.getElementById('gameWorld');
                    var ctx = canvas.getContext('2d');

                    ctx.imageSmoothingEnabled = false;
                    
                    gameEngine.init(ctx);

                    new SceneManager(gameEngine, false);

                    gameEngine.start();
                });
            } else {
                this.game.click = null;
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
                    ctx.fillText("GAME OVER", 325, 350);
                    if (this.game.mouse && this.game.mouse.y > 435 && this.game.mouse.y < 450) {
                        ctx.fillStyle = "Red";
                        ctx.fillText("Play again?", 325, 450);
                    } else {
                        ctx.fillStyle = "White";
                        ctx.fillText("Play again?", 325, 450);
                    }
            } if (this.win) {
                ctx.fillStyle = "White";
                ctx.fillText("YOU ESCAPED", 325, 350);
                if (this.game.mouse && this.game.mouse.y > 435 && this.game.mouse.y < 450) {
                    ctx.fillStyle = "Red";
                    ctx.fillText("Play again?", 325, 450);
                } else {
                    ctx.fillStyle = "White";
                    ctx.fillText("Play again?", 325, 450);
                }
            }
        }
    };
};