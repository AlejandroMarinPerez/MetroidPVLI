class Potenciadores{ //clase en la que agregaremos todas las funciones necesarias al player para poder hacer nuevas acciones
	constructor(player){
		this._player = player;
		this.arrayPot = [this.agregarBola, this.superSalto, this.rockets, this.bombas]; //Array de funciones, esto molap
	}

	agregarBola(self){ //agrega todas las funciones necesarias para que el jugador se transforme en bola
		self._player.bolita = function(){
			this._bola = true;
			this._player.body.setSize(this.width, this.height - 31); //cambia los colliders
			this._animacion = 'bolitaDer';
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
				this._player.body.gravity.y = 400;
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

	bombas(self){
		self._player._bombas = new Bullets('bomba', 0, 2500, self._player, null);
		self._timer = 0;
		for(var i = 0; i < self._player._bombas.grupoBalas.length; i++){
			self._player._bombas.grupoBalas.children[i].body.bounce.y = 0.5;
			self._player._bombas.grupoBalas.children[i].body.gravity.y = 200; //ajustes para la estética y eso
			self._player._bombas.grupoBalas.children[i].scale.setTo(1, 1);
			self._player._bombas.grupoBalas.children[i].anchor.x = 0.5;
			self._player._bombas.grupoBalas.children[i].anchor.y = 0.5;
			self._player._bombas.grupoBalas.children[i].timer = 0; //les otorgo un timer a cada una
		}
		self._player.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
		self._player._bombas.shoot = function(){ //redefino el metodo shoot
			if(game.time.now > this._tiempoBala){
				var bal = this._balas.getFirstExists(false);
				bal.animations.play('normal');
				bal.reset(this._shooter.x - 2, this._shooter.y - 10);
				this._tiempoBala = game.time.now + 500;
				bal.lifespan = 0;
			} 
		}
		self._player._bombas.checkCollisionAndTime = function(bullet /*enemy maybe ?*/){
			if(bullet.timer === 0 && bullet.lifespan === 0){
				bullet.timer = game.time.now + this._range;
			}
			else if(bullet.timer > 0 && game.time.now > bullet.timer){
					bullet.animations.play('expl'); //falta la animacion...
					bullet.lifespan = 500;
					bullet.timer = 0;
					console.log('exploTa');
					//faltaria comprobar si algun enemigo esta overlapeando en el momento de la explosion y hacerle daño y eso
					//para eso aun necesitamos al enemigo... (pa pruebas y eso, que el this puede joder)
					//ESTO DE AQUÍ SOLO FUNCIONA PARA LA ULTIMA QUE SE HA PUESTO, NECESITAMOS UN TIMER ESPECIFICO DE CADA UNA...(solved)
			}
		}
		self._player.placeBomb = function(){
			if(this._bola){
				this._bombas.shoot();
			}
		}
		self._player.pKey.onDown.add(self._player.placeBomb, self._player);
	}

	activate(index){ //comienza la funcion en el index
		this.arrayPot[index](this);
	}
}
