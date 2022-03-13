let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

let gameOver = false;

// sprites
ASSET_MANAGER.queueDownload("./sprites/battery_life.png");
ASSET_MANAGER.queueDownload("./sprites/health_bar.png");
ASSET_MANAGER.queueDownload("./sprites/frame_light.png");
ASSET_MANAGER.queueDownload("./sprites/frame_no_light.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");
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
ASSET_MANAGER.queueDownload("./sprites/spells.png");

// background music
ASSET_MANAGER.queueDownload("./sounds/Come-Play-with-Me.mp3");
ASSET_MANAGER.queueDownload("./sounds/sb_marchofmidnight.mp3");

// sound effects
ASSET_MANAGER.queueDownload("./sounds/demonic-woman-scream.mp3");
ASSET_MANAGER.queueDownload("./sounds/four-voices-whispering-6.mp3");
ASSET_MANAGER.queueDownload("./sounds/mixkit-rain-and-thunder-storm-2390.wav");
ASSET_MANAGER.queueDownload("./sounds/Zombie-sound.mp3");
ASSET_MANAGER.queueDownload("./sounds/Fire-crackling-sound.mp3");
ASSET_MANAGER.queueDownload("./sounds/heartbeat.mp3");
ASSET_MANAGER.queueDownload("./sounds/scream18.mp3");
ASSET_MANAGER.queueDownload("./sounds/Wooden-door-opening-sound-effect.mp3");

ASSET_MANAGER.downloadAll(function () {

	ASSET_MANAGER.autoRepeat("./sounds/Come-Play-with-Me.mp3");
	ASSET_MANAGER.autoRepeat("./sounds/sb_marchofmidnight.mp3");
	ASSET_MANAGER.autoRepeat("./sounds/mixkit-rain-and-thunder-storm-2390.wav");
	ASSET_MANAGER.autoRepeat("./sounds/Fire-crackling-sound.mp3");

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	ctx.imageSmoothingEnabled = false;
	
    gameEngine.init(ctx);

	new SceneManager(gameEngine, gameOver);

	gameEngine.start();
});
