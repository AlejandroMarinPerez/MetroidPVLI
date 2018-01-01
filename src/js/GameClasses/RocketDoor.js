class RocketDoor extends Door{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity, player, numPuerta);
		this._tipoBala = tipoBala;
	}

	update(){
		this.logicaPuerta();
		this.desactivar();
	}

	abrir_Puerta(){
		this._open = true;
		this._activa = false; 
		this.sprite.animations.play('abierta');
	}

	desactivar(){
		if(!this._activa){
			this._open = true;
		}
	}
}