let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

let gameOver = false;

// sprites
ASSET_MANAGER.queueDownload("./sprites/battery_life.png");
ASSET_MANAGER.queueDownload("./sprites/health_bar.png");
ASSET_MANAGER.queueDownload("./sprites/frame_light.png");
ASSET_MANAGER.queueDownload("./sprites/frame_no_light.png");

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

	new SceneManager(gameEngine, gameOver);

	gameEngine.start();
});
