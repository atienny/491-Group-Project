let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/character.png");
<<<<<<< HEAD
ASSET_MANAGER.queueDownload("./sprites/zombie.png");
ASSET_MANAGER.queueDownload("./sprites/ground.png");
ASSET_MANAGER.queueDownload("./sprites/wall.png");
=======
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/wall_btm.png");
ASSET_MANAGER.queueDownload("./sprites/wall_top.png");

>>>>>>> 15ce3b1ee55ae0857966f98ba5306fde23ffc834

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	ctx.imageSmoothingEnabled = false;
	
    gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});