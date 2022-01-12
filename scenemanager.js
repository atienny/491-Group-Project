class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 200, y:200};
        this.loadLevel();
    };

    loadLevel() {
        
        this.lyra = new Lyra(this.game, 200, 200, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);

    };

    update() {
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.BB.center.x - midpoint.x;
        this.y = this.lyra.BB.center.y - midpoint.y;
    };

    draw(ctx) {

    };

}