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
        this.title = true;
        this.credits = false;
        this.transition = false;

        this.level = 1;

        this.loadLevel(this.level, this.transition, this.title);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevel(level, transition, title) {

        this.title = title;
        this.clearEntities();
        this.level = level;

        switch(this.level) {
            case 1: 
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, this.gameOver, this.lyra.win));
                else {
                    this.loadLevelOne(); 
                };
                break;
            case 2: 
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, this.gameOver, this.lyra.win));
                else {
                    this.loadLevelTwo();
                };
                break;
            case 3: 
                if (transition) this.game.addEntity(new TransitionScreen(this.game, level, this.gameOver, this.lyra.win));
                else {
                    this.loadLevelThree();
                };
                break;
        }

    }

    loadLevelOne() {

        this.loadLayer(levelOne.floor);
        this.loadLayer(levelOne.wall_btm);
        this.loadLayer(levelOne.misc);

        this.centerDoorLeft = new LeftDoor(this.game, 1024, 544, ASSET_MANAGER.getAsset("./sprites/door1.png"), "center", true);
        this.centerDoorRight = new RightDoor(this.game, 1067, 544, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "center", true);

        this.frontDoorLeft = new LeftDoor(this.game, 1024, 896, ASSET_MANAGER.getAsset("./sprites/door1.png"), "front", true);
        this.frontDoorRight = new RightDoor(this.game, 1067, 896, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "front", true);

        this.kitchenDoorLeft = new LeftDoor(this.game, 96, 576, ASSET_MANAGER.getAsset("./sprites/door1.png"), "kitchen", true);
        this.kitchenDoorRight = new RightDoor(this.game, 139, 576, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "kitchen", true);
        
        this.game.addEntity(this.centerDoorLeft);
        this.game.addEntity(this.centerDoorRight);
        this.game.addEntity(this.frontDoorLeft);
        this.game.addEntity(this.frontDoorRight);
        this.game.addEntity(this.kitchenDoorLeft);
        this.game.addEntity(this.kitchenDoorRight);

        this.stairUp = new StairsVertical(this.game, 1248, 540, ASSET_MANAGER.getAsset("./sprites/stairs.png"), true);
        this.game.addEntity(this.stairUp);

        this.loadLayer(levelOne.furniture_btm);
        this.loadLayer(levelOne.wall_top2);
        
        //Kitchen zombies
        this.zombieOne = new Zombie(this.game, 100, 200, [{x: 100, y: 200}, {x: 500, y: 200}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieTwo = new Zombie(this.game, 500, 300, [{x: 500, y: 300}, {x: 100, y: 300}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        
        //Dining room zombies
        this.zombieThree = new Zombie(this.game, 100, 640, [{x: 100, y: 640}, {x: 700, y: 640}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        
        this.game.addEntity(this.zombieOne);
        this.game.addEntity(this.zombieTwo);
        this.game.addEntity(this.zombieThree);
        

        this.witchOne = new Witch(this.game, 800, 225, [{x: 800, y: 225}, {x: 1200, y: 225}], ASSET_MANAGER.getAsset("./sprites/witch.png"))
        this.witchTwo = new Witch(this.game, 1050, 225, [{x: 1050, y: 100}, {x: 1050, y: 350}], ASSET_MANAGER.getAsset("./sprites/witch.png"))

        this.game.addEntity(this.witchOne);
        this.game.addEntity(this.witchTwo);

        this.ghostOne = new Ghost(this.game, 0, 0, [{x: 0, y: 0}, {x: 1000, y: 1000}], ASSET_MANAGER.getAsset("./sprites/ghost.png"));
        this.ghostTwo = new Ghost(this.game, 1000, 0, [{x: 1000, y: 0}, {x: 0, y: 1000}], ASSET_MANAGER.getAsset("./sprites/ghost.png"));
        
        this.game.addEntity(this.ghostOne);
        this.game.addEntity(this.ghostTwo);

        this.centerNorthFirePlace = new FirePlace(this.game, 1023, 10, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1055, 14, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);

        this.lyra = new Lyra(this.game, 1170, 650, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(levelOne.wall_top);
        this.loadLayer(levelOne.furniture_top);
        

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

        this.firstkey = new Key(this.game, 1580, 440, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.secondkey = new Key(this.game, 370, 217, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.thirdkey = new Key(this.game, 660, 70, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));

        // this.firstkey = new Key(this.game, 1170, 650, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        // this.secondkey = new Key(this.game, 1170, 650, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        // this.thirdkey = new Key(this.game, 1170, 650, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));

        this.game.addEntity(this.firstkey);
        this.game.addEntity(this.secondkey);
        this.game.addEntity(this.thirdkey);

        if (!this.title) {  // level.music was taken out as all levels have music
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(levelOne.music);
            ASSET_MANAGER.playAsset(levelOne.music2);
            ASSET_MANAGER.playAsset(levelOne.music3);
        }

    };

    loadLevelTwo() {

        this.loadLayer(levelTwo.floor);
        this.loadLayer(levelTwo.extra);
        this.loadLayer(levelTwo.misc);

        this.bedroomLeftTwo = new RightDoor(this.game, 139, 416, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "bedroomLeft", true);
        this.bedroomRightTwo = new RightDoor(this.game, 1547, 416, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "bedroomRight", true);
        this.stairTwo = new RightDoor(this.game, 1259, 640, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "secondStairwell", true);
        
        this.game.addEntity(this.bedroomLeftTwo);
        this.game.addEntity(this.bedroomRightTwo);
        this.game.addEntity(this.stairTwo);

        this.loadLayer(levelTwo.wall_btm);
        this.loadLayer(levelTwo.wall_top2);
        this.loadLayer(levelTwo.stairs);

        this.atticStairs = new StairsVertical(this.game, 576, 0, ASSET_MANAGER.getAsset("./sprites/stairs.png"), true);
        this.game.addEntity(this.atticStairs);

        this.stairDown = new StairsTwotoOne(this.game, 1313, 640, ASSET_MANAGER.getAsset("./sprites/stairs.png"), true);
        this.game.addEntity(this.stairDown);
        
        this.loadLayer(levelTwo.furniture_btm);
        this.loadLayer(levelTwo.bed_btm);


        this.centerNorthFirePlace = new FirePlace(this.game, 1022, 777, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.centerNorthFire = new Fire(this.game, 1054, 781, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.game.addEntity(this.centerNorthFirePlace);
        this.game.addEntity(this.centerNorthFire);
        
        
        this.bedroomLeftOne = new LeftDoor(this.game, 96, 416, ASSET_MANAGER.getAsset("./sprites/door1.png"), "bedroomLeft", true);
        this.bedroomRightOne = new LeftDoor(this.game, 1504, 416, ASSET_MANAGER.getAsset("./sprites/door1.png"), "bedroomRight", false);
        this.stairOne = new LeftDoor(this.game, 1216, 640, ASSET_MANAGER.getAsset("./sprites/door1.png"), "secondStairwell", true);
        
        this.game.addEntity(this.bedroomLeftOne);
        this.game.addEntity(this.bedroomRightOne);
        this.game.addEntity(this.stairOne);

        this.zombieOne = new Zombie(this.game, 50, 500, [{x: 50, y: 500}, {x: 350, y: 500}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieTwo = new Zombie(this.game, 350, 475, [{x: 350, y: 475}, {x: 650, y: 475}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieThree = new Zombie(this.game, 650, 500, [{x: 650, y: 500}, {x: 950, y: 500}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieFour = new Zombie(this.game, 950, 475, [{x: 950, y: 475}, {x: 1250, y: 475}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieFive = new Zombie(this.game, 1250, 500, [{x: 1250, y: 500}, {x: 1550, y: 500}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        
        this.witchOne = new Witch(this.game, 100, 50, [{x: 100, y: 50}, {x: 200, y: 50}], ASSET_MANAGER.getAsset("./sprites/witch.png"))
        this.witchTwo = new Witch(this.game, 900, 100, [{x: 900, y: 100}, {x: 900, y: 300}], ASSET_MANAGER.getAsset("./sprites/witch.png"))
        this.witchThree = new Witch(this.game, 1150, 100, [{x: 1150, y: 100}, {x: 1150, y: 300}], ASSET_MANAGER.getAsset("./sprites/witch.png"))

        this.game.addEntity(this.zombieOne);
        this.game.addEntity(this.zombieTwo);
        this.game.addEntity(this.zombieThree);
        this.game.addEntity(this.zombieFour);
        this.game.addEntity(this.zombieFive);
        // this.game.addEntity(this.witchOne);
        this.game.addEntity(this.witchTwo);
        this.game.addEntity(this.witchThree);

        this.lyra = new Lyra(this.game, 560, 150, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(levelTwo.furniture_top);
        this.loadLayer(levelTwo.wall_top);

        // Small Hall
        this.secondlvlCandles1 = new Candles(this.game, 932, 774, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles2 = new Candles(this.game, 996, 774, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles3 = new Candles(this.game, 1124, 774, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles4 = new Candles(this.game, 1188, 774, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        // Big Hall
        this.secondlvlCandles5 = new Candles(this.game, 68, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles6 = new Candles(this.game, 164, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles7 = new Candles(this.game, 388, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles8 = new Candles(this.game, 612, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles9 = new Candles(this.game, 708, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles10 = new Candles(this.game, 900, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles11 = new Candles(this.game, 1092, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles12 = new Candles(this.game, 1284, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles13 = new Candles(this.game, 1476, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles14 = new Candles(this.game, 1572, 422, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        // Bedroom
        this.secondlvlCandles15 = new Candles(this.game, 36, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles16 = new Candles(this.game, 132, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles17 = new Candles(this.game, 260, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles18 = new Candles(this.game, 356, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        this.secondlvlCandles19 = new Candles(this.game, 420, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles20 = new Candles(this.game, 548, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles21 = new Candles(this.game, 644, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles22 = new Candles(this.game, 772, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        this.secondlvlCandles23 = new Candles(this.game, 868, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles24 = new Candles(this.game, 996, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles25 = new Candles(this.game, 1092, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles26 = new Candles(this.game, 1220, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        
        this.secondlvlCandles27 = new Candles(this.game, 1284, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles28 = new Candles(this.game, 1380, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles29 = new Candles(this.game, 1508, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));
        this.secondlvlCandles30 = new Candles(this.game, 1604, 6, ASSET_MANAGER.getAsset("./sprites/fireplace.png"));

        
        this.game.addEntity(this.secondlvlCandles1);
        this.game.addEntity(this.secondlvlCandles2);
        this.game.addEntity(this.secondlvlCandles3);
        this.game.addEntity(this.secondlvlCandles4);
        this.game.addEntity(this.secondlvlCandles5);
        this.game.addEntity(this.secondlvlCandles6);
        this.game.addEntity(this.secondlvlCandles7);
        this.game.addEntity(this.secondlvlCandles8);
        this.game.addEntity(this.secondlvlCandles9);
        this.game.addEntity(this.secondlvlCandles10);
        this.game.addEntity(this.secondlvlCandles11);
        this.game.addEntity(this.secondlvlCandles12);
        this.game.addEntity(this.secondlvlCandles13);
        this.game.addEntity(this.secondlvlCandles14);
        this.game.addEntity(this.secondlvlCandles15);
        this.game.addEntity(this.secondlvlCandles16);
        this.game.addEntity(this.secondlvlCandles17);
        this.game.addEntity(this.secondlvlCandles18);
        this.game.addEntity(this.secondlvlCandles19);
        this.game.addEntity(this.secondlvlCandles20);
        this.game.addEntity(this.secondlvlCandles21);
        this.game.addEntity(this.secondlvlCandles22);
        this.game.addEntity(this.secondlvlCandles23);
        this.game.addEntity(this.secondlvlCandles24);
        this.game.addEntity(this.secondlvlCandles25);
        this.game.addEntity(this.secondlvlCandles26);
        this.game.addEntity(this.secondlvlCandles27);
        this.game.addEntity(this.secondlvlCandles28);
        this.game.addEntity(this.secondlvlCandles29);
        this.game.addEntity(this.secondlvlCandles30);


        this.firstKey = new Key(this.game, 1031, 605, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.secondKey = new Key(this.game, 317, 50, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.thirdKey = new Key(this.game, 1048, 170, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));

        this.game.addEntity(this.firstKey);
        this.game.addEntity(this.secondKey);
        this.game.addEntity(this.thirdKey);
    
        if (!this.title) {  
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(levelTwo.music);
            ASSET_MANAGER.playAsset(levelTwo.music2);
            ASSET_MANAGER.playAsset(levelTwo.music3);
        }

    }

    loadLevelThree() {

        this.loadLayer(levelThree.floor);
        this.loadLayer(levelThree.wall_btm);

        this.stairDown = new StairsTwotoOne(this.game, 384, 64, ASSET_MANAGER.getAsset("./sprites/stairs.png"), true);
        this.game.addEntity(this.stairDown);

        this.loadLayer(levelThree.furniture_btm);

        this.outerDoorLeft = new LeftDoor(this.game, 256, 96, ASSET_MANAGER.getAsset("./sprites/door1.png"), "outer", true);
        this.outerDoorRight = new RightDoor(this.game, 299, 96, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "outer", true);

        this.game.addEntity(this.outerDoorLeft);
        this.game.addEntity(this.outerDoorRight);

        this.zombieOne = new Zombie(this.game, 300, 276, [{x: 300, y: 276}, {x: 700, y: 276}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieTwo = new Zombie(this.game, 96, 796, [{x: 96, y: 192}, {x: 96, y: 796}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));
        this.zombieThree = new Zombie(this.game, 860, 192, [{x: 860, y: 192}, {x: 860, y: 796}], ASSET_MANAGER.getAsset("./sprites/zombie1.png"));

        this.game.addEntity(this.zombieOne);
        this.game.addEntity(this.zombieTwo);
        this.game.addEntity(this.zombieThree);

        // this.ghostOne = new Ghost(this.game, 300, 276, [{x: 300, y: 276}, {x: 700, y: 276}], ASSET_MANAGER.getAsset("./sprites/ghost.png"));
        // this.game.addEntity(this.ghostOne);

        this.lyra = new Lyra(this.game, 464, 500, ASSET_MANAGER.getAsset("./sprites/character.png"));
        // this.lyra = new Lyra(this.game, 464, 100, ASSET_MANAGER.getAsset("./sprites/character.png"));
        this.game.addEntity(this.lyra);

        this.loadLayer(levelThree.wall_top);

        this.firstKey = new Key(this.game, 502, 450, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.secondKey = new Key(this.game, 246, 275, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));
        this.thirdKey = new Key(this.game, 320, 840, ASSET_MANAGER.getAsset("./sprites/masterKey.png"));

        this.game.addEntity(this.firstKey);
        this.game.addEntity(this.secondKey);
        this.game.addEntity(this.thirdKey);

        this.innerDoorLeft = new LeftDoor(this.game, 513, 640, ASSET_MANAGER.getAsset("./sprites/door1.png"), "inner", true);
        this.innerDoorRight = new RightDoor(this.game, 556, 640, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "inner", true);
        this.midDoorLeft = new LeftDoor(this.game, 385, 768, ASSET_MANAGER.getAsset("./sprites/door1.png"), "mid", true);
        this.midDoorRight = new RightDoor(this.game, 428, 768, ASSET_MANAGER.getAsset("./sprites/doorsmirror.png"), "mid", true);


        this.game.addEntity(this.innerDoorLeft);
        this.game.addEntity(this.innerDoorRight);
        this.game.addEntity(this.midDoorLeft);
        this.game.addEntity(this.midDoorRight);
 
        if (!this.title) { 
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset(levelThree.music);
            ASSET_MANAGER.playAsset(levelThree.music2);
            ASSET_MANAGER.playAsset(levelThree.music3);
        }

    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update() {

        this.updateAudio();

        if (this.title && this.game.click) {
            if (this.game.mouse && (this.game.mouse.x > 325 && this.game.mouse.x < 375) && (this.game.mouse.y > 485 && this.game.mouse.y < 505)) {
                this.title = false;
                this.loadLevel(this.level, this.transition, this.title);
            }
            if (this.game.mouse && (this.game.mouse.x > 325 && this.game.mouse.x < 400) && (this.game.mouse.y > 535 && this.game.mouse.y < 550)) {
                this.credits = true;
                if (this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 350) && (this.game.mouse.y > 635 && this.game.mouse.y < 650)) {
                    this.credits = false;
                    this.game.click = null;
                } else {
                    this.game.click = null;
                }
            }
        } else {
            this.game.click = null;
        }

        if (this.game.changeLevel && this.level == 3) {
            this.clearEntities();
            this.level -= 1;
            this.loadLevelTwo();
            console.log(this.level);
        } else if (this.game.changeLevel && this.level == 2) {
            this.clearEntities();
            this.level -= 1;
            this.loadLevelOne();
            console.log(this.level);
        } 

        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2, y : PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2 };
        this.x = this.lyra.x - midpoint.x;
        this.y = this.lyra.y - midpoint.y;
    };

    draw(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH * 1.5 + 'px "Press Start 2p"';
        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), 0, 0, 700, 700);
            
            ctx.fillStyle = "White";
            ctx.fillText("LUMIN", 275, 400);
    
            ctx.font = PARAMS.BLOCKWIDTH * 0.75 + 'px "Press Start 2p"';
            if (this.game.mouse && (this.game.mouse.x > 325 && this.game.mouse.x < 375) && (this.game.mouse.y > 485 && this.game.mouse.y < 505)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Start", 325, 500);
            } else {
                ctx.fillStyle = "White";
                ctx.fillText("Start", 325, 500);
            }
            if (this.game.mouse && (this.game.mouse.x > 325 && this.game.mouse.x < 400) && (this.game.mouse.y > 535 && this.game.mouse.y < 550)) {
                ctx.fillStyle = "Red";
                ctx.fillText("Credits", 325, 550);
            } else {
                ctx.fillStyle = "White";
                ctx.fillText("Credits", 325, 550);
            }
            if (this.credits) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), 0, 0, 700, 700);
                ctx.fillStyle = "White";
                ctx.fillText("Created by: ", 300, 250);
                ctx.fillText("Atien Ny", 300, 300);
                ctx.fillText("Drew White", 300, 350);
                ctx.fillText("Ryan Trepanier", 300, 400);
                ctx.fillText("Bryce Meadors", 300, 450);
                if (this.game.mouse && (this.game.mouse.x > 300 && this.game.mouse.x < 350) && (this.game.mouse.y > 635 && this.game.mouse.y < 650)) {
                    ctx.fillStyle = "Red";
                    ctx.fillText("Back", 300, 650);
                    if(this.game.click) {
                        this.credits = false;
                        this.game.click = null;
                    }
                } else {
                    ctx.fillStyle = "White";
                    ctx.fillText("Back", 300, 650);
                }
            }
        } else {
    
        //hud
        if (this.gameOver == false) {
        this.healthBarSpritesheet = ASSET_MANAGER.getAsset("./sprites/health_bar.png");
        
        if (this.game.Q == true) {
        this.fogSheet = ASSET_MANAGER.getAsset("./sprites/frame_light.png");
        } else {
            this.fogSheet = ASSET_MANAGER.getAsset("./sprites/frame_no_light.png");
        }
        ctx.drawImage(this.fogSheet, 0, 0, 700, 700);
            
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
            this.lyra.win = false;
            this.clearEntities();
            this.game.addEntity(new TransitionScreen(this.game, this.level, this.gameOver, this.lyra.win));
        }        
    
        if (this.lyra.win == true) {
            this.gameOver = true;
            this.clearEntities();
            this.game.addEntity(new TransitionScreen(this.game, this.level, this.gameOver, this.lyra.win));
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
        }
        };

    loadLayer(property) {
        
        for (let i = 0; i < levelTwo.height; i++) {
            for  (let j = 0; j < levelTwo.width; j++) {
                let cell = levelTwo.width * i + j;
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
