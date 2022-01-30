class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 1295, y: 900};
        this.loadLevel();
    };

    loadLevel() {
    
        this.loadLayer(level.floor);
        this.loadLayer(level.wall);
        this.lyra = new Lyra(this.game, 1295, 900, ASSET_MANAGER.getAsset("./sprites/character.png"));
        // fire is offset by 80, 10 to fit in fire place
        this.centerNorthFirePlace = new FirePlace(this.game, 1215, 0, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1295, 10, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesWest = new Candles(this.game, 1100, 630, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesEast = new Candles(this.game, 1500, 630, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.westHallwayCandle = new Candles(this.game, 300, 675, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.lyra);
        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);
        this.game.addEntity(this.mainRoomCandlesWest);
        this.game.addEntity(this.mainRoomCandlesEast);
        this.game.addEntity(this.westHallwayCandle);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.x - midpoint.x;
        this.y = this.lyra.y - midpoint.y;
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