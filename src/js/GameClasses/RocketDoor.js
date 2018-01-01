class RocketDoor extends Door{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity, player, numPuerta);
		this._tipoBala = tipoBala;
		//this.sprite.tint = 0xFF2525;
	}

	desactivar(){
		this._activa = false;
	}
}