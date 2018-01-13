var playState = {

	//IMPORTANTE: Siempre que declares una variable en estas funciones y la uses, siempre poner el THIS.
//--------------------------------------------------------------------CREACION---------------------------------------------------------------

	create: function(){
		//this.game.stage.scale.pageAlignHorizontally = true;
		//this.game.stage.scale.pageAlignVeritcally = true;
		this._potActivados = 0;
		//------------MAPA----------
		this.map = new TileMap('gameTiles', 'Background' ,'Main', 'Objects'); //creamos el mapa a partir del Tile
		var playerStart = this.map.findObjectsByType('playerStart', this.map.objectsLayer); //un objeto que nos indica el comienzo
		this.capa_Overlaps = this.creacion_Overlaps('overlap'); //crea la capa de overlaps para que el jugador no pueda transformarse
		//his.capa_Camara = this.creacion_Overlaps('camara');
		//this.capa_puertas = this.creacion_Overlaps('door');
		//console.log(this.capa_Camara);
		this.tps = this.map.findObjectsByType('tp', this.map.objectsLayer);

		//------------PLAYER & CANVAS----------
		this.player = new Player(playerStart[0].x, playerStart[0].y, 'dude', 400, 150, 200, this.map._blockedLayer, playerStart[0].x, playerStart[0].y);
		this.canvas = new Canvas();
		this.energia = this.player.health;
		this.canvas.addText(16, 16, 'EN: ' + this.energia, '65px Arial', '#FFF');

		//--------------------Creacion de arena, puetas, enemigos...-------------------
		this.creacion_ElementosMapa();
		this.creacion_Enemigos();
		//CAPA POR DELANTE DEL PLAYER!
		this.map._backgroundLayer2 = this.map._map.createLayer('Tuberias'); //para que quede chulo se crean después, maybe lo hago de otra forma luego...

		//------------COSAS DE PRUEBA----------
		this.One = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.TwoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.ThreeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.FourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.FiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		this.SixKey = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
		//------------ARRAY DE COLISIONES----------
		//this.prueba= new ObjectPot(this.player.player.x + 200, 7845, 'bee', 0, 1, this.player);
		var p = this.map.findObjectsByType('pot', this.map.objectsLayer);
		this.pots = [];
		for(var i = 0; i < p.length; i++){
			var po = new ObjectPot(p[i].x, p[i].y,'pot', 0, p[i].properties.numAActivar, this.player);
			this.pots.push(po);
		}
		this.objetosQueColisionan = [this.hands, this.player.player, this.spikes];
	},

//-------------------------------------------------------------------UPDATE-----------------------------------------------------------------

	update: function(){
		this.tpDebug();
		game.camera.focusOnXY(this.player.player.x, this.player.player.y);
		//game.camera.follow(this.player.player);
		game.physics.arcade.overlap(this.player.player,this.capa_Overlaps, this.cancelarTransformacion, null, this); //Si overlapea con el grupo de objetos de overlap, no podrá transformarse

		//------------COLISION & PLAYERUPDATE----------
		this.map.update(this.objetosQueColisionan); //objetos que colisionan con el mapa
		this.player.update(); // update del player (colision de balas 2)
		this.updateEnemigos();
		this.energia = this.player.health;
		this.canvas.setText(0, 'EN: ' + this.energia); //pruebas solo (el canvas me tiene frito en verdad xdd)
		this.canvas.updateCanvas();
		//this.prueba.update();

		for(var i = 0; i < this.pots.length; i++){
			this.pots[i].update();
		}
	},

//-------------------------------------------------------------------RENDER-----------------------------------------------------------------

	render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(this.player.player, 32, 500);
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

	creacion_Enemigos: function(){
		//NIDOS DE AVISPAAAAAAA
		var nest = this.map.findObjectsByType('nest', this.map.objectsLayer);
		this.nests = [];
		for(var i = 0; i < nest.length; i++){
			var spawn = new WaspSpawn(nest[i].x, nest[i].y, null, 0, 10000, this.player);
			this.nests.push(spawn);
		}
		//NO SE QUE ES ESTO, COSAS QUE FLOTAAAAN
		var cositasQueFlotan = this.map.findObjectsByType('floater', this.map.objectsLayer); //crea los objetos de tipo arena
		this.floaters = [];
		for(var i = 0; i < cositasQueFlotan.length; i++){
			var flo = new Floater(cositasQueFlotan[i].x, cositasQueFlotan[i].y, 0,'floater', 75, 0, this.map._blockedLayer, 1, 7, 0, this.player);
			this.floaters.push(flo);
		}

		//Murcielagoooos
		var murcielagos = this.map.findObjectsByType('bat', this.map.objectsLayer);
		this.bats = [];
		for(var i = 0; i < murcielagos.length; i++){
			var b = new Bat(murcielagos[i].x, murcielagos[i].y, 0,'bat', 60, 275, this.map._blockedLayer, 8, 7, 0, this.player);
			this.bats.push(b);
		}

		//Waveeeers
		var wav = this.map.findObjectsByType('waver', this.map.objectsLayer);
		this.wavers = [];
		for(var i = 0; i < wav.length; i++){
			var w = new Waver(wav[i].x, wav[i].y, 0,'waver', 160, 160, this.map._blockedLayer, 8, 7, 0, this.player);
			this.wavers.push(w);
		}

		//Abejaaaaas
		var bees= this.map.findObjectsByType('bee', this.map.objectsLayer);
		this.Bees = [];
		for(var i = 0; i < bees.length; i++){
			var b = new Bee(bees[i].x, bees[i].y, 0,'bee', 100, 200, this.map._blockedLayer, 8, 7, 0, this.player);
			this.Bees.push(b);
		}

	},

	creacion_ElementosMapa(){
		//ARENAAAAAA
		var sand = this.map.findObjectsByType('arena', this.map.objectsLayer); //crea los objetos de tipo arena
		this.Arena = [];
		for(var i = 0; i < sand.length; i++){
			var sandy = new DamageZone(sand[i].x, sand[i].y, null, 0 , this.player);
			this.Arena.push(sandy); //los agrega al array de arenas
		}
		//PUERTAAAAAS
		var door = this.map.findObjectsByType('door', this.map.objectsLayer);
		this.Doors= [];
		for(var i = 0; i < door.length; i++){
			var puerta = new BasicDoor(door[i].x, door[i].y, 'door', 0 , this.player, i, 'bala');
			this.Doors.push(puerta);
		}
		var length = this.Doors.length;
		door = [];
		door = this.map.findObjectsByType('rocketDoor', this.map.objectsLayer);
		for(var i = 0; i < door.length; i++){
			var puerta = new RocketDoor(door[i].x, door[i].y, 'rocketDoor', 0 , this.player, i + length, 'rocket');
			this.Doors.push(puerta);
		}
	},

	cancelarTransformacion: function(){
		if(this.player.no_PuedeTransformarse != undefined)
			this.player.no_PuedeTransformarse();
	},

	updateEnemigos(){
		for(var i = 0; i < this.Doors.length; i++){
			this.Doors[i].update(); //UPDATE DE DOORS
		}

		for(var i = 0; i < this.Arena.length; i++){
			this.Arena[i].update(); //comprobacion de overlap entre arena y player
		}

		for(var i = 0; i < this.nests.length; i++){
			this.nests[i].update(); //UPDATE DE AVISPILLAS
		}

		for(var i = 0; i < this.floaters.length; i++){
			this.floaters[i].update(); //UPDATE DE ESO
		}

		for(var i = 0; i < this.bats.length; i++){
			this.bats[i].update(); //UPDATE DE ESO
		}

		for(var i = 0; i < this.wavers.length; i++){
			this.wavers[i].update(); //UPDATE DE ESO
		}

		for(var i = 0; i < this.Bees.length; i++){
			this.Bees[i].update(); //UPDATE DE ESO
		}
	},

//-------------------------------------------------------------------PRUEBAS-----------------------------------------------------------------

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
	}
}
