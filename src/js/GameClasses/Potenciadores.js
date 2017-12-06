class Potenciadores{ //clase en la que agregaremos todas las funciones necesarias al player para poder hacer nuevas acciones
	constructor(player){
		this._player = player;
		this.arrayPot = [this.agregarBola, this.superSalto, this.rockets]; //Array de funciones, esto molap
	}

	agregarBola(self){ //agrega todas las funciones necesarias para que el jugador se transforme en bola
		self._player.bolita = function(){
			this._bola = true;
			this._player.body.setSize(this.width, this.height/2 - 7); //cambia los colliders
			this._animacion = 'bolita';
		}

		self._player.transformarse = function(){
			if(this._player.body.velocity.y === 0){
				this.bolita();
			}
		}

		self._player.normal = function(){ //vuelve a la normalidad
			if(this._bola && this._puedeTrans){
				this._bola = false;
				this._player.body.setSize(this.width, this.height);
				this._player.body.y = this._player.y - 34.25; //este numero hay que cambiarlo pero no se llegar a él... (es AlturaDeAntes - AlturaEnBola)
				this._animacion = 'normal';
			}
		}

		self._player.no_PuedeTransformarse = function(){
			this._puedeTrans = false;
		}
	}

	superSalto(self){
		self._player.jumpSpeed = self._player.jumpSpeed * 2; //valor que aún no he definido bien, ahora salta mucho creo xD
	}


	rockets(self){
		self._player._rockets = new Bullets('rocket', 300, null, self._player);
		self._player._basicBullets = self._player._currentBullets;
		self._player.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		self._player.changeBullets = function(){
			if(this._currentBullets === this._basicBullets){
				this._currentBullets = this._rockets;
			}
			else{
				this._currentBullets = this._basicBullets;
			}
			playState.objetosQueColisionan.splice(3, 1);
			playState.objetosQueColisionan.push(this.grupoBalas); //dios esto es tan guarro que me da miedo (en vdd no se si es guarro o no pero...)

		}
		self._player.shiftKey.onDown.add(self._player.changeBullets, self._player);
	}

	activate(index){ //comienza la funcion en el index
		this.arrayPot[index](this);
	}
}
