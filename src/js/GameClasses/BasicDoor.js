class BasicDoor extends DoorFather{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity, player, numPuerta, tipoBala);
		this._openTimer = 0;
	}

	update(){
		this.logicaPuerta();
		this.cerrarPuerta();
	}

	cerrarPuerta(){
		if(game.time.now > this._openTimer && !this._enCurso){ //timer por ahora, se cierra a los 3 segundos, discutir si dejarlo o quitarlo (provoca un pequeño bug grafico de vez en cuando :P)
			this._open = false; //timer
		}

		if(!this._open){ //reset timer
			this._openTimer = 0;
		}
	}

	abrir_Puerta(){
		this._open = true; 
		this._openTimer = game.time.now + 3000; //activa el timer, animacion y abre la puerta
		this.sprite.animations.play('abierta');
	}
}