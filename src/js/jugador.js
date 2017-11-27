class Player extends GameSprite{
	constructor(posX, posY, sprite, gravity, scaleX, scaleY){
		super(posX, posY, sprite, gravity, scaleX, scaleY);

		this._player = this._sprite; //asignacion con el sprite del padre para que el nombre sea mas legible
		game.camera.follow(this._player);
		this._aim = 'left';
		this.define_Keys();
		this._basicBullets = new Bullets('bala', 300, 300, this); //balas añadidas en una clase, que hereda de la clase GroupFather
	}

	mueveIzquierda(){
		this._aim = 'left';
		this._player.body.velocity.x = -150;
	}

	mueveDerecha(){
		this._player.body.velocity.x = 150;
		this._aim = 'right';
	}

	apuntaArriba(){
		this._aim = 'up';
	}

	apuntaAbajo(){ //se puede apuntar hacia abajo??
		this._aim = 'down';
	}

	//Tengo que ver si se puede disparar en diagonal (?) pero bueno, mas comprobaciones , metodos que cambien el string y poco más supongo xd

	update(){ //update del jugador, se reinicia la velocidad, la gravedad y comprueba si choca o no con el suelo, los eventos de teclado		
		this._player.body.velocity.x = 0;  //reiniciamos variables...
		this._player.body.gravity.y = 150;
		this.handle_Events();
		if(this._player.body.touching.down){  
			this._contSaltos = 0;
		}

	}

	morir(){
		this._player.kill(); //destruye el objeto Jugador
	}

	//Aquí hacemos el saltito
	saltar(){
		if(this._contSaltos < 2){
			this._player.body.velocity.y = -200;
			this._contSaltos++;
		}
	}

	handle_Events(){
		//If del movimiento...
		if(this.AKey.isDown){ //si presiona izquierda
			this.mueveIzquierda();
		}
		else if(this.DKey.isDown){ //si presiona derecha
			this.mueveDerecha();
		}
		
		if(this.cursores.down.isDown){
			this.apuntaAbajo();                 //esto hay que cambiarlo, apuntar con los cursores es muy kk
		} 
		else if(this.cursores.up.isDown){
			this.apuntaArriba();
		}

		if(this.JKey.isDown){
			this._basicBullets.shoot(this._aim);
		}
	}

	define_Keys(){
		this.cursores = game.input.keyboard.createCursorKeys(); //"listener" de eventos de teclado, declarando la variable cursores	
		this.JKey = game.input.keyboard.addKey(Phaser.Keyboard.J); //definimos la J
		this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W); //definimos la W
		this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A); //definimos la A
		this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S); //definimos la S
		this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.D); //definimos la D
		this.WKey.onDown.add(this.saltar,this); //le añadimos a la tecla UP la funcion saltar
	}

	//Unos gets simples para saber las coordenadas del jugador y para devolvernos al propio jugador
	get x(){
		return this._player.x;
	}
	get y(){
		return this._player.y;
	}
	get player(){
		return this._player;
	}
}
