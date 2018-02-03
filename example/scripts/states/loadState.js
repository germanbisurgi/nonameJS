var loadState = new Bamboo.state('loadState');

loadState.beforePreload = function () {
	var loadScreen = document.querySelector('.loading');
	loadScreen.classList.add('show');
};

loadState.preload = function () {
	this.assets.loadTexture('disc', 'example/assets/images/disc.png');
	this.assets.loadTexture('grass', 'example/assets/images/grass.jpg');
	this.assets.loadTexture('landscape1', 'example/assets/images/landscape1.png');
	this.assets.loadTexture('landscape2', 'example/assets/images/landscape2.png');
	this.assets.loadTexture('landscape3', 'example/assets/images/landscape3.png');
	this.assets.loadTexture('landscape4', 'example/assets/images/landscape4.png');
	this.assets.loadTexture('landscape5', 'example/assets/images/landscape5.png');
	this.assets.loadTexture('landscape6', 'example/assets/images/landscape6.png');
	this.assets.loadTexture('mine', 'example/assets/images/mine.png');
	this.assets.loadTexture('rocket', 'example/assets/images/rocket.png');
	this.assets.loadTexture('snow', 'example/assets/images/snow.png');
	this.assets.loadTexture('stone', 'example/assets/images/stone.png');
	this.assets.loadTexture('player', 'example/assets/images/player.png', 32, 32);
	this.assets.loadTexture('tanks', 'example/assets/images/tanks.png', 32, 32);
	// this.assets.loadAudio('tic', 'example/assets/audio/tic.mp3');
	// this.assets.loadAudio('laser', 'example/assets/audio/laser.mp3');
	// this.assets.loadAudio('shot', 'example/assets/audio/shot.mp3');
	// this.assets.loadAudio('motor', 'example/assets/audio/motor.mp3');
};

loadState.loading = function () {
	var loadingProgress = document.querySelector('.loading-progress');
	loadingProgress.innerText = this.assets.loadProgress().percent + '%' + this.assets.loadProgress().lastLoaded;
};

loadState.create = function () {
	this.game.switchState('physicsState');
};
