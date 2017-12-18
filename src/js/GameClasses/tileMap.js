//CLASS TILEMAP, clase en donde se gestionan las cosas del mapa AKA construccion, colision , objetos del mapa...

class TileMap{
	//Creación del mapa, layers...
	constructor(image, backLayerName, collisionLayerName, objectLayerName){
		this._map = game.add.tilemap('mapaA');
		this._map.addTilesetImage(image);
		this._backgroundLayer = this._map.createLayer(backLayerName); //los names de las layers tienen que ser iguales que en tile
		this._blockedLayer = this._map.createLayer(collisionLayerName);
		this._objectsLayer = objectLayerName;
		//this._blockedLayer.debug = true;
		this._map.setCollisionBetween(1, 1500, true, this._blockedLayer); //el 1500 es el maximo numero que se encuentra en la parte "layers" del json (unos cuantos aumentados por si acaso)
		this._blockedLayer.resizeWorld();
		this._totalEnemies = 0; //Para la actualizacion de los enemigos, calculamos el total según los vamos añadiendo
	}


//--------------------------------------------------------------------UPDATE---------------------------------------------------------------

	update(objects){ //pura comprobacion de colisiones
		for(var i = 0; i < objects.length; i++){
			game.physics.arcade.collide(objects[i], this._blockedLayer);
		}
	}

//--------------------------------------------------------------------CREAR Y ENCONTRAR OBJETOS DEL TILEMAP---------------------------------------------------------------

	findObjectsByType(type, layer){ //encuentra los objetos por su tipo
		var result = [];
		this._map.objects[layer].forEach(function(element){
			if(element.properties.type === type){
				element.y -= 50;//this.tileMapHeight;
				result.push(element);
			}
		});
		return result;
	}

	createFromTiledObject(elemento, grupo, textura){
		var sprite = grupo.create(elemento.x, elemento.y, textura); //crea en el grupo un elemento con dichas posiciones x e y (se puede añadir textura....)
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	get objectsLayer(){
		return this._objectsLayer;
	}


	///----------------------------------------Búsqueda de los enemigos-----------------------------------------------------------///
	addEnemies(type){
		if (type === 'floater'){
			var criaturas = this.findObjectsByType(type, this._objectsLayer);
			console.log(criaturas.length);
			for(var i = 0; i < criaturas.length; i++){
				var enemie = new Floater(criaturas[i].x, criaturas[i].y, 0, 'spike', 50, 0, this._blockedLayer, 10, 3, 0);
				game.floaterGroup.group.addChild(enemie);
			}
			this._totalEnemies += criaturas.length;
		}
	}
}
