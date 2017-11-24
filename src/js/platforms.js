class Platforms extends GroupFather{
	constructor(){
		super();
		this._variable; 
	}

	create_Platform(x, y, texture, height, width){
			this._variable = this._object.create(x, y, texture);
			this._variable.scale.setTo(height, width);  //crea el objeto, lo añade al grupo, lo escala...
			//esto hace que si lo pisas no se mueva, ya que como le afectan las físicas...
			this._variable.body.immovable = true;
	}	

	update(objetos){
		for(var i = 0; i < objetos.length; i++){
			game.physics.arcade.collide(objetos[i], this._object); //establece colisiones con todos los objetos del array que recibe
		}
	}

	get platforms(){
		return this._variable; //por si acaso el get
	}

}