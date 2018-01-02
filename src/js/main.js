var playState = {

	//IMPORTANTE: Siempre que declares una variable en estas funciones y la uses, siempre poner el THIS.
//--------------------------------------------------------------------CREACION---------------------------------------------------------------

	create: function(){
		//------------MAPA----------
		this.map = new TileMap('gameTiles', 'Background' ,'Main', 'Objects'); //creamos el mapa a partir del Tile
		var playerStart = this.map.findObjectsByType('playerStart', this.map.objectsLayer); //un objeto que nos indica el comienzo
		this.capa_Overlaps = this.creacion_Overlaps('overlap'); //crea la capa de overlaps para que el jugador no pueda transformarse
		//his.capa_Camara = this.creacion_Overlaps('camara');
		//this.capa_puertas = this.creacion_Overlaps('door');
		//console.log(this.capa_Camara);
		this.tps = this.map.findObjectsByType('tp', this.map.objectsLayer);

		//------------PLAYER & CANVAS----------
		this.player = new Player(playerStart[0].x, playerStart[0].y, 'dude', 400, 150, 200, this.map._blockedLayer); //una clase o_O (posX,posY, sprite, gravity, scaleX, scaleY)
		this.canvas = new Canvas();
		this.energia = this.player.health;
		this.canvas.addText(16, 16, 'EN: ' + this.energia, '65px Arial', '#FFF');

		//--------------------Creacion de arena y purtas -------------------

		var sand = this.map.findObjectsByType('arena', this.map.objectsLayer); //crea los objetos de tipo arena
		this.Arena = [];
		for(var i = 0; i < sand.length; i++){
			var sandy = new DamageZone(sand[i].x, sand[i].y, null, 0 , this.player);
			this.Arena.push(sandy); //los agrega al array de arenas
		}
		var door = this.map.findObjectsByType('door', this.map.objectsLayer); //crea los objetos de tipo arena
		this.Doors= [];
		for(var i = 0; i < door.length; i++){
			var puerta = new BasicDoor(door[i].x, door[i].y, 'door', 0 , this.player, i, 'bala');
			this.Doors.push(puerta); //los agrega al array de arenas
		}
		var length = this.Doors.length;
		door = [];
		door = this.map.findObjectsByType('rocketDoor', this.map.objectsLayer);
		for(var i = 0; i < door.length; i++){
			var puerta = new RocketDoor(door[i].x, door[i].y, 'rocketDoor', 0 , this.player, i + length, 'rocket');
			this.Doors.push(puerta); //los agrega al array de arenas
		}
		var nest = this.map.findObjectsByType('nest', this.map.objectsLayer); //crea los objetos de tipo arena
		this.nests = [];
		for(var i = 0; i < nest.length; i++){
			var spawn = new WaspSpawn(nest[i].x, nest[i].y, null, 0, 10000, this.player);
			this.nests.push(spawn); //los agrega al array de arenas
		} 
		this.map._backgroundLayer2 = this.map._map.createLayer('Tuberias'); //para que quede chulo se crean después, maybe lo hago de otra forma luego...

		//------------COSAS DE PRUEBA----------
		this.cosasDePrueba();
		//this.prueba = new RocketDoor(playerStart[0].x, playerStart[0].y, 'door', 0 , this.player, 3, 'rocket');
		this.One = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.TwoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.ThreeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE); 
		this.FourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR); 
		this.FiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		this.SixKey = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
		//------------ARRAY DE COLISIONES----------
		this.objetosQueColisionan = [this.hands, this.player.player, this.spikes]; //metiendo aqui todo lo que colisiona con las paredes, suelo, etc, funciona.
		//this.puertaPrueba = new Door(playerStart[0].x, playerStart[0].y, 'door', 0, this.player);
		//this.prueba = new WaspSpawn(17260, 2496,'bala', 0, 10000, this.player);
		/*this.prueba = new Wasp(17137, 2756, 0,'dude', 150, 250, 0, 10, 5, 0, this.player);
		this.prueba2 = new Wasp(16789, 2756, 0, 'dude', 150, 250, 0, 10, 5, 0, this.player);
		this.prueba1 = new Wasp(18999,2756, 0, 'dude', 150, 250, 0, 10, 5, 0, this.player);*/
	},

//-------------------------------------------------------------------UPDATE-----------------------------------------------------------------

	update: function(){
		this.tpDebug();
		game.camera.focusOnXY(this.player.player.x, this.player.player.y);
		//game.camera.follow(this.player.player);
		game.physics.arcade.overlap(this.player.player,this.capa_Overlaps, this.cancelarTransformacion, null, this); //Si overlapea con el grupo de objetos de overlap, no podrá transformarse
		
		//------------COSAS DE PRUEBA----------
		//Vamos a comprobar si el player hace "overlap" con una mano y llamamos a la funcion collectStar
		game.physics.arcade.overlap(this.player.player,this.hands, this.collectStar, null, this); //no se que es ni el null ni el this ese
		//lo mismo pero para los pinchos
		game.physics.arcade.overlap(this.player.player,this.spikes, this.daño, null, this);
		//------------COLISION & PLAYERUPDATE----------
		this.map.update(this.objetosQueColisionan); //objetos que colisionan con el mapa
		this.player.update(); // update del player (colision de balas 2)
		for(var i = 0; i < this.Arena.length; i++){
			this.Arena[i].update(); //comprobacion de overlap entre arena y player
		}
		this.energia = this.player.health;
		this.canvas.setText(0, 'EN: ' + this.energia); //pruebas solo (el canvas me tiene frito en verdad xdd)
		this.canvas.updateCanvas();
		//game.physics.arcade.overlap(this.player.player,this.capa_puertas, this.kk, null, this);
		for(var i = 0; i < this.Doors.length; i++){
			this.Doors[i].update(); //comprobacion de overlap entre arena y players
		}
		//this.kk();
		for(var i = 0; i < this.nests.length; i++){
			this.nests[i].update(); //comprobacion de overlap entre arena y players
		}
	},

//-------------------------------------------------------------------RENDER-----------------------------------------------------------------

	render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(this.player.player, 32, 500);
        //game.debug.body(this.player.player);
    },
    kk: function(player, puerta){
    	//game.camera.follow(null);
    	//console.log('yey');
    	/*game.camera.x = 7650;               esto podrá sernos útil una vez que las puertas funcionen, podemos lockear la cámara en una posición si queremos, para que se parezca más al juego
    	if(game.camera.x >= 7650){
			game.camera.x = 7650;
		}*/
		/*console.log(game.numDoor);
		if(game.numDoor === 2){
			if(game.camera.x > game.doorSprite.x - 700){
				game.camera.x = game.doorSprite.x - 700;
			}
		}*/
    },
 //-------------------------------------------------------------------AUXILIARES-----------------------------------------------------------------
 	creacion_Overlaps: function(string){
		var self = this;
		grupo = new Group(); //crea un nuevo grupo y lo iguala a la variable
    	grupo = grupo.group;
		var result = self.map.findObjectsByType(string, self.map.objectsLayer); //encuentra los objetos del tipo "overlap"
		result.forEach(function(element){
			self.map.createFromTiledObject(element, grupo, null); //los crea...
		});

		return grupo;
	},

	daño: function(player, spike){ //metodo de daño, que probablemente tengan que llevar los enemigos...
		if(!this.player._immune){
			this.player.recoil_Damage(spike.x, 1); //por ahora aqui...
			this.player.immune();
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

	tpDebug(){
		if(this.One.isDown){
			this.player.player.body.x = this.tps[0].x;
			this.player.player.body.y = this.tps[0].y;
		}
		else if(this.TwoKey.isDown){
			this.player.player.body.x = this.tps[1].x;
			this.player.player.body.y = this.tps[1].y;
		}
		else if(this.ThreeKey.isDown){
			this.player.player.body.x = this.tps[2].x;
			this.player.player.body.y = this.tps[2].y;
		}
		else if(this.FourKey.isDown){
			this.player.player.body.x = this.tps[3].x;
			this.player.player.body.y = this.tps[3].y;
		}
		else if(this.FiveKey.isDown){
			this.player.player.body.x = this.tps[4].x;
			this.player.player.body.y = this.tps[4].y;
		}
		else if(this.SixKey.isDown){
			console.log(this.tps[5]);
			this.player.player.body.x = this.tps[5].x;
			this.player.player.body.y = this.tps[5].y;
		}
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
