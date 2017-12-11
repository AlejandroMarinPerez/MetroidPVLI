//CLASS PLAYER, gestiona tooodo lo relacionado con el Jugador. No hay problemas en hacer varios jugadores, se podría meter un modo 2 jugadores sin problema (solo hay que poner modificables las teclas
// del movimiento obviamente, pero como no está en nuestros objetivos por ahora se puede mantener así). Movimiento, animaciones...

class Player extends Movable{
	constructor(posX, posY, sprite, gravity, speed, jumpSpeed, colliders){
		super(posX, posY, sprite, gravity, speed, jumpSpeed); //constructor de Movable
		this._colliders = colliders; //capa con la que ha de colisionarse
		this.construccion_Jugador();
		this.define_Keys();
	}

//--------------------------------------------------------------------MOVIMIENTO---------------------------------------------------------------

	mueveIzquierda(){ //mueve el pj a la izquierda, guarda su direccion y gestiona sus animaciones
		this._aim = 'left';
		this.moveLeft(this._player, 0);
		this._ultimaDir = -1;
		if(!this._bola){
			if(this._player.body.onFloor()){
				if(this.JKey.isDown)
					this.cambiaAnim('runShoot'); //las condiciones de las animaciones, que son horribles
				else
					this.cambiaAnim('andar');
			}
			this._player.scale.x = -1;
		}
		else{
			this.cambiaAnim('bolitaDer');
			this._player.scale.x = -1;
		}
	}

	mueveDerecha(){ //mueve el pj a la derecha, guarda su direccion y gestiona sus animaciones
		this._aim = 'right';
		this.moveRight(this._player, 0);
		this._ultimaDir = 1;
		if(!this._bola){
			if(this._player.body.onFloor()){
				if(this.JKey.isDown)
					this.cambiaAnim('runShoot');
				else
					this.cambiaAnim('andar');
			}
			this._player.scale.x = 1;
		}
		else
			this.cambiaAnim('bolitaDer');
		this._player.scale.x = 1;
	}

	//Aquí hacemos el saltito (por tiempo presionando la tecla)
	saltar(){
		if(this.WKey.isDown && this._player.body.onFloor() && !this._bola){
			this.cambiaAnim('salto');
			this._jumpTimer = game.time.now + 600;
			//this._player.body.velocity.y = -this._jumpSpeed;
			this.moveUp(this._player, 0);
		}
		else if(this.WKey.isDown && this._jumpTimer != 0){
			this.cambiaAnim('salto');
			if(game.time.now > this._jumpTimer){
					this._jumpTimer = 0;
				}
				else{
					//this._player.body.velocity.y = -this._jumpSpeed;
					this.moveUp(this._player, 0);
				}
		}
		else{
			this._jumpTimer = 0;
		}
		/*if(this._player.body.velocity.y === 0 && !this._bola){
			this._player.body.velocity.y = -200;
			//this._contSaltos++;
		}*/
	}

	apuntaArriba(){
		this._aim = 'up';
		if(this._player.body.onFloor()){
			if(this._player.body.velocity.x === 0){
				this.cambiaAnim('apArriba');
			}
			else
				this.cambiaAnim('runUpShoot');
		}
		else
			this.cambiaAnim('caida');
	}	

//--------------------------------------------------------------------UPDATES---------------------------------------------------------------

	update(){ //update del jugador, se reinicia la velocidad, la gravedad y comprueba si choca o no con el suelo, los eventos de teclado
		this.reset();
		this.handle_Events();
		this.Anima();
		this._puedeTrans = true; //si no esta en los overlaps que no le dejan transformarse, se pone a true y le dejan transformarse
		this.updateBullets();
		this.caida();
	}

	updateBullets(){ //podrian estar en el array de colisiones, pero como cuando colisionan tienen que hacer algo específico, mejor aquí
		if(this._bombas !== undefined){ //las bombas son especialitas
			game.physics.arcade.collide(this._bombas.grupoBalas, this._colliders, this.bombasAux, null, this);
		}
		for(var i = 0; i < this._arrayBalas.length; i++){
			game.physics.arcade.collide(this._arrayBalas[i], this._colliders, function(bullet){bullet.animations.play('expl');bullet.lifespan = 200;});
		}
	}

//--------------------------------------------------------------------HANDLE_EVENTS------------------------------------------------------------------------

handle_Events(){
		//If del movimiento...
		if(this.AKey.isDown && !this._rebote){ //si presiona izquierda
			this.mueveIzquierda();
		}
		else if(this.DKey.isDown && !this._rebote){ //si presiona derecha
			this.mueveDerecha();
		}
		else{
			this.resetAnimaciones();
		}

		if(this.cursores.up.isDown && this._puedeTrans){
			this.apuntaArriba();
			if(this._bola){
				this.normal();
			}
		}

		this.saltar();

		if(this.JKey.isDown && !this._bola){ //si presiona la tecla de disparo...
			if(!this.player.body.onFloor() && this._player.body.velocity.y < 0 && !this.cursores.up.isDown)
				this.cambiaAnim('shootJump'); //si dispara mientras salta cambia de animacion
			this._currentBullets.shoot(this._aim);
		}
	}

//--------------------------------------------------------------------RESETS------------------------------------------------------------------------

	reset(){  //reset de la velocidad, si no deberia haber rebote se hace normal, si hay rebote comienza un timer y cuando el timer llegue al tiempo especificado se reinicia la velocidad
		if(!this._rebote){
			this._player.body.velocity.x = 0;  //reiniciamos variables...
		}
		else if (this._rebote && this._reboteTimer == 0){
			this._reboteTimer = game.time.now + 200;
		}
		else if(game.time.now > this._reboteTimer){
				this._player.body.velocity.x = 0;
				this._rebote = false;
				this._reboteTimer = 0;
		}
		this.immune();	
	}

	resetAnimaciones(){
		if(!this._bola){ //si no es bola y toca el suelo, pone la animacion normal, si es bola, pone la animacion de bola. Ajusta el aim también
				if(this._player.body.onFloor())
				this.cambiaAnim('normal');
				if(this._player.scale.x === -1){
					this._aim = 'left';
				}
				else{
					this._aim = 'right';
				}
			}
			else{
				this.cambiaAnim('bolitaDer');
			}
	}

//--------------------------------------------------------------------DAÑO/INMUNIDAD/REBOTE------------------------------------------------------------------------
	
	recoil_Damage(posEnemigo){
		if(this._player.body.x - posEnemigo <= 0){ //para saber la direccion del rebote
			this.moveLeft(this._player, 0);
		}
		else{
			this.moveRight(this._player, 0);
		}
		this._player.damage(1); //si la salud llega a 0, el player muere
		this._rebote = true;
		this._immune = true;
	}

	immune(){
		if(this._immune && this._immuneTimer === 0){
			this._immuneTimer = game.time.now + 2000;
		}
		else if(this._immuneTimer !== 0){
			this.blink();
			if(game.time.now > this._immuneTimer){
				this._immune = false;
				this._immuneTimer = 0;
				this._player.alpha = 1;
			}
		}
	}

//--------------------------------------------------------------------POTENCIADORES & ATRIBUTOS------------------------------------------------------------------------

	activarMejoras(i){
		this._potenciadores.activate(i);
	}

	heal(int){
		this._player.health += int;
	}

	morir(){
		this.kill(); //destruye el objeto Jugador
	}

	bombasAux(bullet){
		this._bombas.checkCollisionAndTime(bullet);
	}

//--------------------------------------------------------------------ANIMACIONES------------------------------------------------------------------------

	Anima(){
		this._player.animations.play(this._animacion);
	}

	cambiaAnim(anim){
		this._animacion = anim;
	}

	caida(){ //gestiona la animacion de la caida
		if(this._player.body.velocity.y > 0){
			if(this.JKey.isDown && !this.cursores.up.isDown){
				this.cambiaAnim('fallShoot');
			}
			else
				this.cambiaAnim('caida');
		}
	}

	blink(){ //parpadeo al ser dañado
		if(game.time.now > this._blinkTimer){
			if(this._player.alpha === 0.75 || this._player.alpha === 1){
				this._player.alpha = 0.25;
			}
			else{
				this._player.alpha = 0.75;
			}
				this._blinkTimer = game.time.now + 50;
		}
	}

//------------------------------------------------------------CONSTRUCCIÓN & DECLARACIÓN DE VARIABLES------------------------------------

	construccion_Jugador(){ //construccion de las variables necesarias para el jugador
		this._player = this._sprite; //asignacion con el sprite del padre para que el nombre sea mas legible
		this._player.anchor.setTo(0.5, 0.5); //ancla
		game.camera.follow(this._player);
		this._player.health = 30; //vida inicial original del juego
		this._immune = false;
		this._immuneTimer = 0;  //timers de inmune y de parpadeo
		this._blinkTimer = 0;
		this._aim = 'right';
		this._currentBullets = new Bullets('bala', 300, 300, this, null); //balas añadidas en una clase 
		this.declaracionAnimaciones();
		this._width = this._player.body.width;
		this._height = this._player.body.height;
		this._potenciadores = new Potenciadores(this); //potenciadores activados por el player
		this._animacion = 'normal';
		this._jumpTimer = 0;
		this._rebote = false;  //Timer del jump, del rebote...
		this._reboteTimer = 0;
		this._arrayBalas = [this._currentBullets.grupoBalas]; //array de balas disponibles en el jugador
		this._ultimaDir = 1; //almacena la ultima direccion pulsada, util para cuadrar las animaciones
	}


	define_Keys(){
		this.cursores = game.input.keyboard.createCursorKeys(); //"listener" de eventos de teclado, declarando la variable cursores
		this.JKey = game.input.keyboard.addKey(Phaser.Keyboard.J); //definimos la J
		this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W); //definimos la W
		this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A); //definimos la A
		this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S); //definimos la S
		this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.D); //definimos la D
	}

	declaracionAnimaciones(){
		this._player.animations.add('normal', [1], 0, false);
		this._player.animations.add('bolitaDer', [11, 12, 13, 14], 10, true);
		this._player.animations.add('bolitaIz', [14, 13, 12, 11], 10, true);
		this._player.animations.add('salto', [19], 0, true);
		this._player.animations.add('caida', [20], 0, true);
		this._player.animations.add('bolitaParada', [11], 0, true);
		this._player.animations.add('andar', [3, 4, 5], 8, true);
		this._player.animations.add('apArriba', [2], 0, false);
		this._player.animations.add('shootJump', [16], 0, false);
		this._player.animations.add('fallShoot', [17], 0, false);
		this._player.animations.add('runShoot', [15, 16, 17], 8, true);
		this._player.animations.add('runUpShoot', [18, 19, 20], 8, true);
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	get x(){
		return this._player.x;
	}
	get y(){
		return this._player.y;
	}
	get width(){
		return this._width;
	}
	get height(){
		return this._height;
	}
	get player(){
		return this._player;
	}
	get health(){
		return this._player.health;
	}
	get jumpSpeed(){
		return this._jumpSpeed;
	}
	get grupoBalas(){
		return this._currentBullets.grupoBalas;
	}
	get bomas(){
		return this._bombas;
	}
	set jumpSpeed(vel){
		this._jumpSpeed = vel;
	}
	get ammo(){
		return this._currentBullets.ammo;
	}
}
