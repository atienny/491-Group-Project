class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.lyra = {x: 1295, y: 900};

        this.zombie = {x: 1500, y: 950};

        this.lyra = {x: 0, y:0};
        this.loadLevel();
    };

    loadLevel() {
        
        this.loadLayer(level.floor);
        this.loadLayer(level.wall);

        this.lyra = new Lyra(this.game, 1295, 900, ASSET_MANAGER.getAsset("./sprites/character.png"));

        this.zombie = new zombie(this.game, 1500, 950, ASSET_MANAGER.getAsset("./sprites/zombie.png"));

        this.loadLayer(level.wall_btm);
        this.lyra = new Lyra(this.game, 1045, 700, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);
        this.loadLayer(level.wall_top);

        this.game.addEntity(this.zombie);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.x - midpoint.x;
        this.y = this.lyra.y - midpoint.y;

        //this.x = this.zombie.x - midpoint.x;
        //this.y = this.zombie.y - midpoint.y;
    };

    draw(ctx) {
        
    };

    loadLayer(property) {
        for (let i = 0; i < level.height; i++) {
            for  (let j = 0; j < level.width; j++) {
                let cell = level.width * i + j;
                let spriteCode = property.data[cell];
                if (spriteCode != -1) {
                    this.game.addEntity(new Ground(this.game, 
                                                    j * PARAMS.BLOCKWIDTH * PARAMS.SCALE,
                                                    i * PARAMS.BLOCKWIDTH * PARAMS.SCALE,
                                                    property.spritesheet,
                                                    PARAMS.BLOCKWIDTH * (spriteCode % property.imageWidth),
                                                    PARAMS.BLOCKWIDTH * (Math.floor(spriteCode / property.imageWidth)),
                                                    property.collideable));
                }
            }
        }
    };

}