class SceneManager {
    constructor(game, gameOver) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.lyra = {x: 0, y: 0};
        this.zombie = {x: 0, y: 0};
        this.witch = {x: 0, y: 0};

        this.gameOver = gameOver;
        this.title = false;
        this.transition = false;
        this.loadLevel(this.transition, this.title);
    };

    loadLevel(transition, title) {
        this.title = title;


        if (transition) {
            this.game.addEntity(new transitionscreen(this.game, this.gameOver));
        }

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

        this.centerDoorLeft = new LeftDoor(this.game, 1024, 544, ASSET_MANAGER.getAsset("./sprites/door1.png"), "center");
        this.centerDoorRight = new RightDoor(this.game, 1067, 544, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "center");

        this.frontDoorLeft = new LeftDoor(this.game, 1024, 896, ASSET_MANAGER.getAsset("./sprites/door1.png"), "front");
        this.frontDoorRight = new RightDoor(this.game, 1067, 896, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "front");

        this.kitchenDoorLeft = new LeftDoor(this.game, 96, 576, ASSET_MANAGER.getAsset("./sprites/door1.png"), "kitchen");
        this.kitchenDoorRight = new RightDoor(this.game, 139, 576, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "kitchen");

        this.firstkey = new Key(this.game, 1580, 440, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.secondkey = new Key(this.game, 920, 570, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.thirdkey = new Key(this.game, 1220, 570, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));

        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);
        this.game.addEntity(this.mainRoomCandlesWest);
        this.game.addEntity(this.mainRoomCandlesEast);
        this.game.addEntity(this.westHallwayCandle);
        this.game.addEntity(this.centerDoorLeft);
        this.game.addEntity(this.centerDoorRight);
        this.game.addEntity(this.frontDoorLeft);
        this.game.addEntity(this.frontDoorRight);
        this.game.addEntity(this.kitchenDoorLeft);
        this.game.addEntity(this.kitchenDoorRight);
        this.game.addEntity(this.firstkey);
        this.game.addEntity(this.secondkey);
        this.game.addEntity(this.thirdkey);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.x - midpoint.x;
        this.y = this.lyra.y - midpoint.y;
    };

    draw(ctx) {
    //hud
    if (this.gameOver == false) {
    this.healthBarSpritesheet = ASSET_MANAGER.getAsset("./sprites/health_bar.png");
        
    //full hp 3/3
    if(this.lyra.health > 200) {
        ctx.drawImage(this.healthBarSpritesheet, 31, 23, 330, 89, 10, 80, 100, 40);
    }

    // 2/3 hp
    if (this.lyra.health > 100 && this.lyra.health <= 200) {
        ctx.drawImage(this.healthBarSpritesheet, 31, 133, 330, 89, 10, 80, 100, 40);
    }

    // 1/3 hp
    if (this.lyra.health <= 100) {
        ctx.drawImage(this.healthBarSpritesheet, 31, 244, 330, 89, 10, 80, 100, 40);
    }

    //no hp, loss message
    if (this.lyra.health == 0) {
        this.gameOver = true;
        this.transition = true;
    
        this.game.addEntity(new TransitionScreen(this.game, this.gameOver));
        console.log("You died.");
    }        

    this.batterySpritesheet = ASSET_MANAGER.getAsset("./sprites/battery_life.png");

    if ((this.game.Q == true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5) * 3)) {
        // 4/5 battery
        ctx.drawImage(this.batterySpritesheet, 296, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q == true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5) * 2)) {
        // 3/5 battery
        ctx.drawImage(this.batterySpritesheet, 534, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q == true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5))) {
        // 2/5 battery
        ctx.drawImage(this.batterySpritesheet, 772, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q == true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer < (this.lyra.flashlightTimerMax / 5))) {
        // 1/5 battery 
        ctx.drawImage(this.batterySpritesheet, 1010, 41, 238, 94, 10, 10, 100, 50);
    }
    if (this.game.Q == true && this.lyra.flashlightTimer < 0.5) {
        // empty battery
        ctx.drawImage(this.batterySpritesheet, 1248, 41, 238, 94, 10, 10, 100, 50);
    }

    //battery going back up 

    if ((this.game.Q != true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer < (this.lyra.flashlightTimerMax / 5))) {
        // 1/5 battery 
        ctx.drawImage(this.batterySpritesheet, 1010, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q != true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5))) {
        // 2/5 battery
        ctx.drawImage(this.batterySpritesheet, 772, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q != true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5) * 2)) {
        // 3/5 battery
        ctx.drawImage(this.batterySpritesheet, 534, 41, 238, 94, 10, 10, 100, 50);
    }
    if ((this.game.Q != true) && (this.lyra.flashlightTimer < this.lyra.flashlightTimerMax) && (this.lyra.flashlightTimer > (this.lyra.flashlightTimerMax / 5) * 3)) {
        // 4/5 battery
        ctx.drawImage(this.batterySpritesheet, 296, 41, 238, 94, 10, 10, 100, 50);
    }
    if (this.lyra.flashlightTimer >= this.lyra.flashlightTimerMax) {
        // full battery
        ctx.drawImage(this.batterySpritesheet, 58, 41, 238, 94, 10, 10, 100, 50);
    }
    }
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