class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 0, y:0};
        this.zombie = {x: 0, y: 0};
        this.witch = {x: 0, y: 0};

        this.batteryLifeHUD = new BatteryLife(this.game, 1015, 1000, ASSET_MANAGER.getAsset("./sprites/battery_life.png"));

        this.game.addEntity(this.batteryLifeHUD);
        this.loadLevel();
    };

    loadLevel() {
        
        this.loadLayer(level.floor);

        this.lyra = new Lyra(this.game, 1295, 900, ASSET_MANAGER.getAsset("./sprites/character.png"));
        // fire is offset by 32, 4 to fit in fire place at a scaling value of
        this.centerNorthFirePlace = new FirePlace(this.game, 1015, 0, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1047, 4, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesWest = new Candles(this.game, 900, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesEast = new Candles(this.game, 1200, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.westHallwayCandle = new Candles(this.game, 350, 575, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(level.wall_btm);
        this.zombie = new Zombie(this.game, 0, 0, ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.game.addEntity(this.zombie);
        this.loadLayer(level.wall_top);
        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);
        this.game.addEntity(this.mainRoomCandlesWest);
        this.game.addEntity(this.mainRoomCandlesEast);
        this.game.addEntity(this.westHallwayCandle);

        this.witch = new Witch(this.game, 0, 0, ASSET_MANAGER.getAsset("./sprites/witch.png"));
        this.game.addEntity(this.witch);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.x - midpoint.x;
        this.y = this.lyra.y - midpoint.y;
    };

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.fillText = ("Battery Life", PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
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