class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 0, y: 0};
        this.zombie = {x: 0, y: 0};
        this.witch = {x: 0, y: 0};
        this.loadLevel();
    };

    loadLevel() {
        
        this.loadLayer(level.floor);
        this.loadLayer(level.wall_btm);
        
        this.loadLayer(level.furniture_btm);
        this.loadLayer(level.wall_top2);
        
        //Kitchen zombies
        this.zombieOne = new Zombie(this.game, 100, 200, [{x: 100, y: 200}, {x: 500, y: 200}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieTwo = new Zombie(this.game, 500, 300, [{x: 500, y: 300}, {x: 100, y: 300}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        
        //Dining room zombies
        this.zombieThree = new Zombie(this.game, 100, 640, [{x: 100, y: 640}, {x: 700, y: 640}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        
        this.game.addEntity(this.zombieOne);
        this.game.addEntity(this.zombieTwo);
        this.game.addEntity(this.zombieThree);
        

        this.witch = new Witch(this.game, 900, 225, [{x: 700, y: 225}, {x: 900, y: 225}], ASSET_MANAGER.getAsset("./sprites/witch.png"))
        this.game.addEntity(this.witch);

        this.centerNorthFirePlace = new FirePlace(this.game, 1023, 10, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1055, 14, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);

        this.lyra = new Lyra(this.game, 1025, 700, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(level.wall_top);
        this.loadLayer(level.furniture_top);
        

        // Foyer candles
        this.mainCandlesOne = new Candles(this.game, 900, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.mainCandlesTwo = new Candles(this.game, 1220, 550, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        
        // Livingroom candles
        this.livingCandleOne = new Candles(this.game, 644, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.livingCandleTwo = new Candles(this.game, 804, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.livingCandleThree = new Candles(this.game, 964, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.livingCandleFour = new Candles(this.game, 1155, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.livingCandleFive = new Candles(this.game, 1315, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.livingCandleSix = new Candles(this.game, 1475, 5, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        // Dining room candles
        this.diningCandleOne = new Candles(this.game, 68, 582, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.diningCandleTwo = new Candles(this.game, 196, 582, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.diningCandleThree = new Candles(this.game, 484, 582, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.diningCandleFour = new Candles(this.game, 772, 582, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        this.game.addEntity(this.mainCandlesOne);
        this.game.addEntity(this.mainCandlesTwo);

        this.game.addEntity(this.livingCandleOne);
        this.game.addEntity(this.livingCandleTwo);
        this.game.addEntity(this.livingCandleThree);
        this.game.addEntity(this.livingCandleFour);
        this.game.addEntity(this.livingCandleFive);
        this.game.addEntity(this.livingCandleSix);
        
        this.game.addEntity(this.diningCandleOne);
        this.game.addEntity(this.diningCandleTwo);
        this.game.addEntity(this.diningCandleThree);
        this.game.addEntity(this.diningCandleFour);

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