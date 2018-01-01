class DoorFather extends GameSprite{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity);
		this._player = player;
		this.setImmovable(true);
		this._open = false;
		this.sprite.animations.add('cerrada', [0], 0, false);
		this.sprite.animations.add('abierta', [1, 2], 5, false);
		this._NUMPUERTA = numPuerta;
		this._tipoBala = tipoBala;
		this._enCurso = false;
		this._activa = true;
	}

	logicaPuerta(){
		if(!this._open){ //si no está, abierta, colisiona con player y balas
			this.sprite.animations.play('cerrada');
			game.physics.arcade.collide(this._player.player, this.sprite);
			for(var i = 0; i < this._player._arrayBalas.length; i++){
				game.physics.arcade.collide(this._player._arrayBalas[i], this.sprite, function(door, bullet){console.log(bullet);bullet.animations.play('expl'); bullet.lifespan = 200;if(bullet.key === this._tipoBala){this.abrir_Puerta();}}, null, this); //abrir la puerta
			}
		}
		else if(this._player.player.x >= this.sprite.x - 15 && this._player.player.x <= this.sprite.x + this.sprite.width + 15){ //si esta dentro de la puerta
				this._enCurso = true;
				this._player._puedeControlar = false; //controla al jugador solo
				this.aux = this._player.hSpeed;
				this._player.hSpeed = 80;
				if(this._player._ultimaDir === 1){
					this._player.mueveDerecha();	
				}
				else
					this._player.mueveIzquierda();
			}
		else if(!this._player._puedeControlar && this._enCurso){  //recupera el jugador los controles y cierra la puerta
				this._enCurso = false;
				this._open = false;
				this._player._puedeControlar = true;
				this._player.hSpeed = this.aux;
		}	
	}
}