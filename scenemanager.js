class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 0, y:0};
        this.zombie = {x: 0, y: 0};
        this.witch = {x: 1344, y: 832};

        this.batteryLifeHUD = new BatteryLife(this.game, 1015, 1000, ASSET_MANAGER.getAsset("./sprites/battery_life.png"));

        this.game.addEntity(this.batteryLifeHUD);
        this.loadLevel();
    };

    loadLevel() {
        
        this.loadLayer(level.floor);
        this.loadLayer(level.wall_btm);
        
        this.zombie = new Zombie(this.game, 350, 190, [{x: 200, y: 210}, {x: 400, y: 210}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.game.addEntity(this.zombie);
        

        this.witch = new Witch(this.game, 900, 275, [{x: 700, y: 275}, {x: 900, y: 275}], ASSET_MANAGER.getAsset("./sprites/witch.png"))
        this.game.addEntity(this.witch);

        this.lyra = new Lyra(this.game, 1025, 700, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);


        this.lyra = new Lyra(this.game, 1295, 900, ASSET_MANAGER.getAsset("./sprites/character.png"));

        this.witch = new Witch(this.game, 900, 375, [{x: 700, y: 375}, {x: 900, y: 375}], ASSET_MANAGER.getAsset("./sprites/witch.png"));
        this.game.addEntity(this.witch);

        this.zombie = new Zombie(this.game, 350, 190, [{x: 200, y: 210}, {x: 400, y: 210}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.game.addEntity(this.zombie);

        // fire is offset by 32, 4 to fit in fire place at a scaling value of
        this.centerNorthFirePlace = new FirePlace(this.game, 1015, 0, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1047, 4, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesWest = new Candles(this.game, 900, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainRoomCandlesEast = new Candles(this.game, 1200, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.westHallwayCandle = new Candles(this.game, 350, 575, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(level.wall_btm);
    
        this.loadLayer(level.wall_top);

//         this.loadLayer(level.wall);
//         this.lyra = new Lyra(this.game, 1295, 900, ASSET_MANAGER.getAsset("./sprites/character.png"));
        // fire is offset by 80, 10 to fit in fire place
//         this.centerNorthFirePlace = new FirePlace(this.game, 1215, 0, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
//         this.centerNorthFire = new Fire(this.game, 1295, 10, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
//         this.mainRoomCandlesWest = new Candles(this.game, 1100, 630, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
//         this.mainRoomCandlesEast = new Candles(this.game, 1500, 630, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
//         this.westHallwayCandle = new Candles(this.game, 300, 675, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
//         this.game.addEntity(this.lyra);

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