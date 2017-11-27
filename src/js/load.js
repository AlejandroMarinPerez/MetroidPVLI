var loadState = {
	//preload es una funcion de phaser que se llama una sola vez y se suele usar para cargar los recursos
	preload: function(){
		
		var loading = game.add.text(80,150,'loading...',{font: '40px Courier', fill: '#FFF'}); //una textito de carga

		game.load.image('dude', 'assets/personaje.png'); //Cargamos tooodos los recursos que vamos a necesitar
		game.load.image('sky', 'assets/cueva.jpg'); 
    	game.load.image('star', 'assets/hand.png');
    	game.load.image('spike', 'assets/spikes.png');
    	game.load.image('bala', 'assets/bala.png');
    	game.load.tilemap('prueba', 'assets/tileMapPrueba.json', null, Phaser.Tilemap.TILED_JSON); //el primer tile
    	game.load.image('gameTiles', 'assets/simples_pimples.png'); //las imagenes del tile
    	console.log("Cargando..."); //simple debug
	},

	create: function(){

		//Llamamos al siguiente estado --> menu
		game.state.start('menu');
	}
};

