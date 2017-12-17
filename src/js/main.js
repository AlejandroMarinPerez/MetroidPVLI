var playState = {

	//IMPORTANTE: Siempre que declares una variable en estas funciones y la uses, siempre poner el THIS.
//--------------------------------------------------------------------CREACION---------------------------------------------------------------

	create: function(){

		//------------MAPA----------
		this.map = new TileMap('gameTiles', 'Background' ,'Main', 'Objects'); //creamos el mapa a partir del Tile
		var playerStart = this.map.findObjectsByType('playerStart', this.map.objectsLayer); //un objeto que nos indica el comienzo
		this.capa_Overlaps = this.creacion_Overlaps(); //crea la capa de overlaps para que el jugador no pueda transformarse

		//------------PLAYER & CANVAS----------
		this.player = new Player(playerStart[0].x, playerStart[0].y, 'dude', 400, 150, 130, this.map._blockedLayer); //una clase o_O (posX,posY, sprite, gravity, scaleX, scaleY)
		this.canvas = new Canvas();
		this.energia = this.player.health;
		this.canvas.addText(16, 16, 'EN: ' + this.energia, '65px Arial', '#FFF');

		//------------COSAS DE PRUEBA----------
		this.cosasDePrueba();

		//------------ARRAY DE COLISIONES----------
		this.objetosQueColisionan = [this.hands, this.player.player, this.spikes]; //metiendo aqui todo lo que colisiona con las paredes, suelo, etc, funciona.


		///----------Enemigos & moar------------------------///
		this.map.addEnemies('floater'); //Enemigos que se mueven horizontalmente
	},

//-------------------------------------------------------------------UPDATE-----------------------------------------------------------------

	update: function(){
		//Actualizamos todos los enemigos
		for(var i = 0; i < this.map._totalEnemies; i++){
			//Comprobamos todos los enemigos de X tipo
			if(i < this.floaterGroup._group.children.length){
				if(game.physics.arcade.collide(this.floaterGroup._group.children[i]._floater, this.map._blockedLayer, null, this)){
					this.floaterGroup._group.children[i].movement();
				}
			}
			//Resto de enemigos cuando estén
		}
		game.physics.arcade.overlap(this.player.player,this.capa_Overlaps, this.cancelarTransformacion, null, this); //Si overlapea con el grupo de objetos de overlap, no podrá transformarse
		//------------COSAS DE PRUEBA----------
		//Vamos a comprobar si el player hace "overlap" con una mano y llamamos a la funcion collectStar
		game.physics.arcade.overlap(this.player.player,this.hands, this.collectStar, null, this); //no se que es ni el null ni el this ese
		//lo mismo pero para los pinchos
		game.physics.arcade.overlap(this.player.player,this.spikes, this.daño, null, this);
		//------------COLISION & PLAYERUPDATE----------
		this.map.update(this.objetosQueColisionan); //objetos que colisionan con el mapa
		this.player.update(); // update del player (colision de balas 2)
	},

//-------------------------------------------------------------------RENDER-----------------------------------------------------------------

	render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(this.player.player, 32, 500);
        //game.debug.body(this.player.player);
    },

 //-------------------------------------------------------------------AUXILIARES-----------------------------------------------------------------
 	creacion_Overlaps: function(){
		var self = this;
		grupo = new Group(); //crea un nuevo grupo y lo iguala a la variable
    	grupo = grupo.group;
		var result = self.map.findObjectsByType('overlap', self.map.objectsLayer); //encuentra los objetos del tipo "overlap"
		result.forEach(function(element){
			self.map.createFromTiledObject(element, grupo, null); //los crea...
		});

		return grupo;
	},

	daño: function(player, spike){ //metodo de daño, que probablemente tengan que llevar los enemigos...
		if(!this.player._immune){
			this.player.recoil_Damage(spike.x); //por ahora aqui...
			this.player.immune();
			this.energia = this.player.health;
			this.canvas.setText(0, 'EN: ' + this.energia);
			this.canvas.updateCanvas();
		}
	},

	cancelarTransformacion: function(){
		if(this.player.no_PuedeTransformarse != undefined)
			this.player.no_PuedeTransformarse();
	},

//-------------------------------------------------------------------PRUEBAS-----------------------------------------------------------------

	collectStar: function(player, hands){
		hands.kill(); //destruye el objeto star
		this.player.activarMejoras(this.indexPrueba); //como prueba, las manitas son potenciadores. Serian simples sprites / grupo de sprites que al cogerlos activasen los potenciadores.
		this.indexPrueba++;
	},

	cosasDePrueba: function(){
		//Manos que te darán puntos
		this.hands = game.add.group();
		this.hands.enableBody = true;
		this.indexPrueba = 0; //pruebas de potenciadores

		for(var i = 1; i <= 4; i++){ //creamos 2 manos

			//Añadimos una mano al grupo Hands
			var mano = this.hands.create(i*200, 7780,'hand');
			//Fisicas...
			mano.body.gravity.y = 100;
			mano.body.bounce.y = 0.4 + Math.random() *0.2;
			mano.scale.setTo(0.05,0.05);
		}

		this.spikes = game.add.group(); //pinchitos

		this.spikes.enableBody = true;

		for(var i = 1; i < 4; i++){
			var spike = this.spikes.create(i*200 + 70, 7780,'spike');
			spike.body.gravity.y = 1000;
			spike.body.velocity.x = 5;
			spike.scale.setTo(0.25,0.25);
		}
	}
}
