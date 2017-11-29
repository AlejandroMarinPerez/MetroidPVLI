var playState = {

	//IMPORTANTE: Siempre que declares una variable en estas funciones y la uses, siempre poner el THIS.
	create: function(){

		//game.world.setBounds(0, 0, 2000, 384); //esto hace que el tamaño del mundo sea el especificado
		this.map = new TileMap('gameTiles', 'Background' ,'Main', 'Objects'); //creamos el mapa a partir del Tile
		var playerStart = this.map.findObjectsByType('playerStart', this.map.objectsLayer); //un objeto que nos indica el comienzo
		this.player = new Player(playerStart[0].x, playerStart[0].y, 'dude', 250, 0.25, 0.25); //una clase o_O (posX,posY, sprite, gravity, scaleX, scaleY)

		//Definimos un grupo de plataformas, esto es importante, al definir el grupo
		//podemos tratar a todas las plataformas como una sola, en vez de ir una por una
		//this.plataformas = new Platforms();
		//activamos las fisicas para dicho grupo
		//this.plataformas.enableBody = true;

		//Creamos el "suelo"
		//this.plataformas.create_Platform(0, game.world.height - 64, 'ground',2 , 2);

		//Pared
		//this.plataformas.create_Platform(400, 300, 'wall',1 ,1); //es otro sprite pero girado, no he encontrado la forma de girarlos en phaser sin que las fisicas se rayen muuuucho
	
		//Manos que te darán puntos
		this.hands = game.add.group();
		this.hands.enableBody = true;

		for(var i = 0; i < 12; i++){ //creamos 12 manos

			//Añadimos una mano al grupo Hands
			var mano = this.hands.create(i*70, 0 ,'hand');
			//Fisicas...
			mano.body.gravity.y = 100;
			mano.body.bounce.y = 0.4 + Math.random() *0.2;
			mano.scale.setTo(0.05,0.05);
		}

		//Añadimos un texto, igualándolo al scoretext, en las coordenadas (16,16) con el texto por defecto "score: 0"
		//y le decimnos que tenga un tamaño de 32 px y el color.Ademas creamos la variable score y la inicializamos a 0
		this.score = 0;
		this.scoreText = game.add.text(16,16, 'score: 0', {fontSize: '32px', fill: '#FFF'});
		this.scoreText.fixedToCamera = true;
		this.scoreMax = 120; //variable scoreMax para saber si hemos acabado

		this.spikes = game.add.group(); //pinchitos

		this.spikes.enableBody = true;

		for(var i = 1; i < 4; i++){
			var spike = this.spikes.create(i*200 + 70, game.world.height - 500 ,'spike');
			spike.body.gravity.y = 1000;
			spike.scale.setTo(0.25,0.25);
		}
		
		this.objetosQueColisionan = [this.hands, this.spikes, this.player.player];
	},

	update: function(){

			//le decimos a las manos y a los pinchos que colisionen con las plataformas
			//game.physics.arcade.collide(this.hands, this.plataformas);
			//this.plataformas.update(this.objetosQueColisionan);
			this.map.update(this.objetosQueColisionan);
			this.player.update();
			
			//Vamos a comprobar si el player hace "overlap" con una mano y llamamos a la funcion collectStar
			game.physics.arcade.overlap(this.player.player,this.hands, this.collectStar, null, this); //no se que es ni el null ni el this ese
			//lo mismo pero para los pinchos
			game.physics.arcade.overlap(this.player.player,this.spikes, this.muerte, null, this);

			if(this.score === this.scoreMax){
				game.state.start('win');
			}

		},


	render: function() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(this.player.player, 32, 500);
    },
	collectStar: function(player, hands){
		hands.kill(); //destruye el objeto star
		//Añade y updatea el texto
		this.score += 10;
		this.scoreText.text = 'Score: ' + this.score;
	},
	
	muerte: function(){
	this.player.morir();
	this.scoreText.text = 'Moriste wey';
	game.state.start('fail');
	},
}