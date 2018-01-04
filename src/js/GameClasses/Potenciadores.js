//CLASS POTENCIADORES, clase en la que agregaremos todas las funciones necesarias al player para poder hacer nuevas acciones

class Potenciadores{ 
	constructor(player){
		this._player = player;
		this.arrayPot = [this.agregarBola, this.superSalto, this.rockets, this.bombas]; //Array de funciones, esto molap
	}

//--------------------------------------------------------------------BOLA------------------------------------------------------------------------

	agregarBola(self){ //agrega todas las funciones necesarias para que el jugador se transforme en bola
		//Agrega la funcion al player de transformarse en pelotita, le cambia el collider, la animacion...
		self._player.bolita = function(){
			if(this._puedeTrans){
				this._bola = true;
				//this._player.body.setSize(this.width, this.height - 30); //cambia los colliders
				//his._player.body.y = this._player.y - 60;
				this._animacion = 'bolitaDer';
				//console.log(this.player.body);
				//this.player.body.bounce.y = 0.2;
			}
		}
		
		//Hace la comprobacion de que no esta saltando y se transforma en bola
		self._player.transformarse = function(){
			if(this._player.body.velocity.y === 0){
				this.bolita();
			}
		}

		//vuelve a la normalidad
		self._player.normal = function(){ 
			if(this._bola && this._puedeTrans){
				this._bola = false;
				//this._player.body.setSize(this.width, this.height);
				//this._player.body.y = this._player.y - 60; //este numero hay que cambiarlo pero no se llegar a él... (es AlturaDeAntes - AlturaEnBola)
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

		//util para el overlap con los objetos que necesitamos para hacer que no se transforme en ciertas zonas
		self._player.no_PuedeTransformarse = function(){
			this._puedeTrans = false;
		}
 		
 		//Agregamos la funcion 'transformarse' al curso Down (mejor en la S (?))
		self._player.cursores.down.onDown.add(self._player.transformarse, self._player);
	}

//--------------------------------------------------------------------SALTO POTENCIADO------------------------------------------------------------------------

	superSalto(self){
		self._player.vSpeed = self._player.vSpeed * 2; //valor que aún no he definido bien, ahora salta mucho creo xD
	}

//--------------------------------------------------------------------COHETES e.e------------------------------------------------------------------------

	rockets(self){
		self._player._rockets = new Bullets('rocket', 300, null, self._player, 5); //nuevas balas
		self._player._arrayBalas.push(self._player._rockets.grupoBalas); //push al array de balas
		self._player._basicBullets = self._player._currentBullets; //guardamos en basicBullets las balas básicas
		self._player.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

		playState.canvas.setText(0, 'EN: ' + self._player.health + '\nAMMO: ' + self._player._rockets.ammo); //canvas por probar cosas
		playState.canvas.updateCanvas(); //ME PARECE QUE ACCEDER ASI AL CANVAS ES MALA PRACTICA, POR AHORA NOS VALE PERO DEBERIAMOS PASARSELO COMO ARGUMENTO A TODA CLASE QUE LO NECESITE... --> PLAYER

		self._player.changeBullets = function(){ //cambiar balas con la tecla SHIFT
				if(this._currentBullets === this._basicBullets && this._rockets.ammo > 0){ //si esta con las balas básicas y tiene municion de cohetes
					this._player.tint = 0xff391f;
					this._currentBullets = this._rockets;
				}
				else{
					this._player.tint = 0xffffff;
					this._currentBullets = this._basicBullets;
				}
		}
		self._player.shiftKey.onDown.add(self._player.changeBullets, self._player);
	}

//--------------------------------------------------------------------BOMBAS------------------------------------------------------------------------

	bombas(self){
		self._player._bombas = new Bullets('bomba', 0, 700, self._player, null); //nuevas balas
		self._player.grupoAuxiliar.group.add(self._player._bombas.grupoBalas);
		for(var i = 0; i < self._player._bombas.grupoBalas.length; i++){ //las bombas son "balas" diferentes, por lo cual hay que hacerle unos pocos ajustillos
			self._player._bombas.grupoBalas.children[i].body.bounce.y = 0.5; //un poco de rebote como en el juego
			self._player._bombas.grupoBalas.children[i].body.gravity.y = 200; //ajustes para la estética y eso
			self._player._bombas.grupoBalas.children[i].scale.setTo(1, 1);
			self._player._bombas.grupoBalas.children[i].anchor.x = 0.5;
			self._player._bombas.grupoBalas.children[i].anchor.y = 0.5;
			self._player._bombas.grupoBalas.children[i].timer = 0; //les otorgamos un timer a cada una
		}

		//TECLA P (PUEDE CAMBIARSE OBVIAMENTE, SON PRUEBAS SOLO)
		self._player.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

		self._player._bombas.shoot = function(){ //redefinimos el metodo shoot original de las balas
			if(game.time.now > this._tiempoBala){
				var bal = this._balas.getFirstExists(false);
				bal.animations.play('normal');
				bal.reset(this._shooter.x + 5, this._shooter.y + 20);
				this._tiempoBala = game.time.now + 1000;
				bal.lifespan = 0;
			} 
		}

		self._player._bombas.checkCollisionAndTime = function(bullet /*enemy maybe ?*/){ //comprueba colision con el enemigo(aún no) y las hace explotar en un tiempo determinado
			if(bullet.timer === 0 && bullet.lifespan === 0){
				bullet.timer = game.time.now + this._range;
			}
			else if(bullet.timer > 0 && game.time.now > bullet.timer){
					bullet.animations.play('expl');
					bullet.lifespan = 500;
					bullet.timer = 0;
					//faltaria comprobar si algun enemigo esta overlapeando en el momento de la explosion y hacerle daño y esO
			}
		}

		self._player.placeBomb = function(){ //colocacion de bomba
			if(this._bola){
				this._bombas.shoot();
			}
		}

		self._player.pKey.onDown.add(self._player.placeBomb, self._player);
	}

//--------------------------------------------------------------------ACTIVACION DE POTENCIADORES------------------------------------------------------------------------

	activate(index){
		this.arrayPot[index](this);
	}
}
