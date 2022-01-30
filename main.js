let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// sprites
ASSET_MANAGER.queueDownload("./sprites/character.png");
<<<<<<< HEAD
=======
ASSET_MANAGER.queueDownload("./sprites/zombie.png");
>>>>>>> parent of 696320e (Merge branch 'main' of https://github.com/atienny/491-Group-Project into DrewBranch)
ASSET_MANAGER.queueDownload("./sprites/ground.png");
ASSET_MANAGER.queueDownload("./sprites/wall.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	ctx.imageSmoothingEnabled = false;
	
    gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});