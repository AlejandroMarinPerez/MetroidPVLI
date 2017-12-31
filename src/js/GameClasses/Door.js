class Door extends GameSprite{
	constructor(posX, posY, sprite, gravity, player, numPuerta){
		super(posX, posY, sprite, gravity);
		this._player = player;
		this.setImmovable(true);
		this._open = false;
		this._openTimer = 0;
		this.sprite.animations.add('cerrada', [0], 0, false);
		this.sprite.animations.add('abierta', [1, 2], 5, false);
		this._NUMPUERTA = numPuerta;
	}

	update(){
		//game.camera.focusOnXY(this.player.player.x, this.player.player.y);
		if(!this._open){ //si no está, abierta, colisiona con player y balas
			this.sprite.animations.play('cerrada');
			game.physics.arcade.collide(this._player.player, this.sprite);
			for(var i = 0; i < this._player._arrayBalas.length; i++){
				game.physics.arcade.overlap(this._player._arrayBalas[i], this.sprite, function(){this._open = true; this._openTimer = game.time.now + 3000; this.sprite.animations.play('abierta');}, null, this); //abrir la puerta
			}
		}
		else if(this._player.player.x >= this.sprite.x - 15 && this._player.player.x <= this.sprite.x + this.sprite.width + 10){ //si esta dentro de la puerta
				this._player._puedeControlar = false; //controla al jugador solo
				if(this._player._ultimaDir === 1){
					this._player.mueveDerecha();	
				}
				else
					this._player.mueveIzquierda();
			}
		else if(!this._player._puedeControlar){  //recupera el jugador los controles y cierra la puerta
				this._player._puedeControlar = true;
				this._openTimer = 0;
		}
		else if(game.time.now > this._openTimer){ //timer por ahora, se cierra a los 3 segundos, discutir si dejarlo o quitarlo (provoca un pequeño bug grafico de vez en cuando :P)
			this._open = false; //timer
		}		
	}
}