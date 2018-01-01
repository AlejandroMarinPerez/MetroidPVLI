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
		this._tipoBala = 0;
		this._activa = true;
	}

	update(){
		this.logicaPuerta();
	}

	logicaPuerta(){
		if(!this._open){ //si no está, abierta, colisiona con player y balas
			this.sprite.animations.play('cerrada');
			game.physics.arcade.collide(this._player.player, this.sprite);
			for(var i = 0; i < this._player._arrayBalas.length; i++){
				game.physics.arcade.collide(this._player._arrayBalas[i], this.sprite, function(door, bullet){bullet.animations.play('expl'); bullet.lifespan = 200;if(this._tipoBala === 0){this.abrir_Puerta(bullet);} else if(this._tipoBala === 'rocket'){if(bullet.key === 'rocket'){this.abrir_Puerta(); this.desactivar();}}}, null, this); //abrir la puerta
			}
		}
		else if(this._player.player.x >= this.sprite.x - 15 && this._player.player.x <= this.sprite.x + this.sprite.width + 10){ //si esta dentro de la puerta
				this._player._puedeControlar = false; //controla al jugador solo
				this.aux = this._player.hSpeed;
				this._player.hSpeed = 100;
				if(this._player._ultimaDir === 1){
					this._player.mueveDerecha();	
				}
				else
					this._player.mueveIzquierda();
			}
		else if(!this._player._puedeControlar){  //recupera el jugador los controles y cierra la puerta
				this._player.hSpeed = this.aux;
				this._player._puedeControlar = true;
				this._openTimer = 0;
		}
		else if(game.time.now > this._openTimer && this._activa){ //timer por ahora, se cierra a los 3 segundos, discutir si dejarlo o quitarlo (provoca un pequeño bug grafico de vez en cuando :P)
			this._open = false; //timer
		}		
	}
	abrir_Puerta(bullet){
		this._open = true; 
		this._openTimer = game.time.now + 3000; 
		this.sprite.animations.play('abierta');
	}
}