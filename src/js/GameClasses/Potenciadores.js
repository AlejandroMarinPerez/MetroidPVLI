class Potenciadores{ //clase en la que agregaremos todas las funciones necesarias al player para poder hacer nuevas acciones
	constructor(player){
		this._player = player;
		this.arrayPot = [this.agregarBola, this.superSalto, this.rockets]; //Array de funciones, esto molap
	}

	agregarBola(self){ //agrega todas las funciones necesarias para que el jugador se transforme en bola
		self._player.bolita = function(){
			this._bola = true;
			this._player.body.setSize(this.width, this.height - 31); //cambia los colliders
			this._animacion = 'bolitaParada';
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
				this._player.body.y = this._player.y - 60; //este numero hay que cambiarlo pero no se llegar a él... (es AlturaDeAntes - AlturaEnBola)
				this._animacion = 'normal';
				if(this._ultimaDir == 1){
					this._aim = 'right';
					this._player.scale.x = 1;
				}
				else{
					this._aim = 'left';
					this._player.scale.x = -1;
				}
			}
		}

		self._player.no_PuedeTransformarse = function(){
			this._puedeTrans = false;
		}

		self._player.cursores.down.onDown.add(self._player.transformarse, self._player);
	}

	superSalto(self){
		self._player.jumpSpeed = self._player.jumpSpeed * 2; //valor que aún no he definido bien, ahora salta mucho creo xD
	}


	rockets(self){
		self._player._rockets = new Bullets('rocket', 300, null, self._player, 5);
		self._player._arrayBalas.push(self._player._rockets.grupoBalas);
		self._player._basicBullets = self._player._currentBullets;
		self._player.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		playState.energiaText.text = 'EN: ' + self._player.health + '\nAMMO: ' + self._player._rockets.ammo; //canvas por probar cosas
		self._player.changeBullets = function(){
				if(this._currentBullets === this._basicBullets && this._rockets.ammo > 0){
					this._player.tint = 0xff391f;
					this._currentBullets = this._rockets;
				}
				else{
					this._player.tint = 0xffffff;
					this._currentBullets = this._basicBullets;
				}
				//playState.objetosQueColisionan.splice(3, 1);
				 //dios esto es tan guarro que me da miedo (en vdd no se si es guarro o no pero...)
			
		}
		self._player.shiftKey.onDown.add(self._player.changeBullets, self._player);
	}

	activate(index){ //comienza la funcion en el index
		this.arrayPot[index](this);
	}
}
