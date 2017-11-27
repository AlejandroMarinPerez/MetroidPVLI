class Platforms extends GroupFather{
	constructor(){
		super();
		this._variable = this._group; 
	}

	create_Platform(x, y, texture, height, width){
			var newPlatform = this._variable.create(x, y, texture);
			newPlatform.scale.setTo(height, width);  //crea el objeto, lo añade al grupo, lo escala...
			//esto hace que si lo pisas no se mueva, ya que como le afectan las físicas...
			newPlatform.body.immovable = true;
	}	

	update(objetos){
		for(var i = 0; i < objetos.length; i++){
			game.physics.arcade.collide(objetos[i], this._variable); //establece colisiones con todos los objetos del array que recibe
		}
	}

	get platforms(){
		return this._variable; //por si acaso el get
	}

}