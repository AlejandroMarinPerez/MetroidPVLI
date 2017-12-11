var playState = {

	//IMPORTANTE: Siempre que declares una variable en estas funciones y la uses, siempre poner el THIS.
	create: function(){

		//game.world.setBounds(0, 0, 2000, 384); //esto hace que el tamaño del mundo sea el especificado
		this.map = new TileMap('gameTiles', 'Background' ,'Main', 'Objects'); //creamos el mapa a partir del Tile
		var playerStart = this.map.findObjectsByType('playerStart', this.map.objectsLayer); //un objeto que nos indica el comienzo
		this.player = new Player(playerStart[0].x, playerStart[0].y, 'dude', 400, 150, 130, this.map._blockedLayer); //una clase o_O (posX,posY, sprite, gravity, scaleX, scaleY)
		this.capa_Overlaps = this.creacion_Overlaps(); //crea la capa de overlaps para que el jugador no pueda transformarse
		this.canvas = new Canvas();
		//Manos que te darán puntos
		this.hands = game.add.group();
		this.hands.enableBody = true;
		this.indexPrueba = 0; //pruebas de poitenciadores

		for(var i = 1; i <= 4; i++){ //creamos 2 manos

			//Añadimos una mano al grupo Hands
			var mano = this.hands.create(i*200, 7780,'hand');
			//Fisicas...
			mano.body.gravity.y = 100;
			mano.body.bounce.y = 0.4 + Math.random() *0.2;
			mano.scale.setTo(0.05,0.05);
		}

		//Añadimos un texto, igualándolo al scoretext, en las coordenadas (16,16) con el texto por defecto "score: 0"
		//y le decimos que tenga un tamaño de 32 px y el color.Ademas creamos la variable score y la inicializamos a 0
		this.energia = this.player.health;
		this.canvas.addText(16, 16, 'EN: ' + this.energia, '65px Arial', '#FFF');

		this.spikes = game.add.group(); //pinchitos

		this.spikes.enableBody = true;

		for(var i = 1; i < 4; i++){
			var spike = this.spikes.create(i*200 + 70, 7780,'spike');
			spike.body.gravity.y = 1000;
			spike.body.velocity.x = 5;
			spike.scale.setTo(0.25,0.25);
		}

		this.objetosQueColisionan = [this.hands, this.player.player, this.spikes];
	},

	update: function(){
		/*if(this.player._immune){  //esto es solo pa pruebas loko
			this.energiaText.text = 'Immuneeeee';
		}
		else{
			this.energiaText.text = 'EN: ' + this.energia;
		}*/

		this.map.update(this.objetosQueColisionan);
		this.player.update();
		//Vamos a comprobar si el player hace "overlap" con una mano y llamamos a la funcion collectStar
		game.physics.arcade.overlap(this.player.player,this.hands, this.collectStar, null, this); //no se que es ni el null ni el this ese
		//lo mismo pero para los pinchos
		game.physics.arcade.overlap(this.player.player,this.spikes, this.muerte, null, this);
		//Si overlapea con el grupo de objetos de overlap, no podrá transformarse
		game.physics.arcade.overlap(this.player.player,this.capa_Overlaps, this.cancelarTransformacion, null, this);
	},


	render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(this.player.player, 32, 500);
        //game.debug.body(this.player.player);
    },
	collectStar: function(player, hands){
		hands.kill(); //destruye el objeto star
		//Añade y updatea el texto
		//this.score += 10;
		//this.scoreText.text = 'Score: ' + this.score;
		this.player.activarMejoras(this.indexPrueba); //como prueba, al coger una mano, activa mejoras
		this.indexPrueba++;
	},

	muerte: function(player, spike){
		if(!this.player._immune){
			this.player.recoil_Damage(spike.x); //por ahora aqui...
			this.player.immune();
			this.energia = this.player.health;
			this.canvas.setText(0, 'EN: ' + this.energia);
			this.canvas.updateCanvas();
		}
	},

	creacion_Overlaps: function(){
		var self = this;
		grupo = new GroupFather(); //crea un nuevo grupo y lo iguala a la variable
    	grupo = grupo.group;
		var result = self.map.findObjectsByType('overlap', self.map.objectsLayer); //encuentra los objetos del tipo "overlap"
		result.forEach(function(element){
			self.map.createFromTiledObject(element, grupo, null); //los crea...
		});

		return grupo;
	},

	cancelarTransformacion: function(){
		if(this.player.no_PuedeTransformarse != undefined)
			this.player.no_PuedeTransformarse();
	}
}
