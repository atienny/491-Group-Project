let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/battery_life.png");
ASSET_MANAGER.queueDownload("./sprites/health_bar.png");
ASSET_MANAGER.queueDownload("./sprites/fireplace.png");
ASSET_MANAGER.queueDownload("./sprites/character.png");
ASSET_MANAGER.queueDownload("./sprites/zombie1.png");
ASSET_MANAGER.queueDownload("./sprites/witch.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/wall.png");
ASSET_MANAGER.queueDownload("./sprites/dark-wood.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	ctx.imageSmoothingEnabled = false;
	
    gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
