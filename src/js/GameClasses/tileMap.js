class TileMap{
	constructor(image, backLayerName, collisionLayerName, objectLayerName){
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this._map = game.add.tilemap('mapaA');
		this._map.addTilesetImage(image);
		this._backgroundLayer = this._map.createLayer(backLayerName); //los names de las layers tienen que ser iguales que en tile
		this._blockedLayer = this._map.createLayer(collisionLayerName);
		this._objectsLayer = objectLayerName;
		this._blockedLayer.debug = true;
		this._map.setCollisionBetween(1, 1000, true, this._blockedLayer); //el 800 es el maximo numero que se encuentra en la parte "layers" del json (unos cuantos aumentados por si acaso)
		//this._backgroundLayer.setScale(2);
		this._blockedLayer.resizeWorld();
		//this.tileMapHeight = this.map.tileHeight;
		/*this.tileMapWidth = this.map.tileWidth;
		this.width = this.map.width;*/
	}

	update(objects){ //pura comprobacion de colisiones
		for(var i = 0; i < objects.length; i++){
			game.physics.arcade.collide(objects[i], this._blockedLayer);
		}
	}

	findObjectsByType(type, layer){ //encuentra los objetos por su tipo
		var result = [];
		this._map.objects[layer].forEach(function(element){
			if(element.properties.type === type){
				element.y -= 100;//this.tileMapHeight;
				result.push(element);
			}
		});
		return result;
	}

	get objectsLayer(){
		return this._objectsLayer;
	}

	//maybe hace falta un metodo para crear objetos... hmmmm
}
