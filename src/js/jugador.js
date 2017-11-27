class Jugador{
	constructor(){
		this._jugador = game.add.sprite(32, game.world.height - 250, 'dude'); //iniciamos todo lo del jugador
		game.physics.arcade.enable(this._jugador);
		this._jugador.body.bounce.y = 0,2;
		this._jugador.body.gravity.y = 250; //fisicas varias
		this._jugador.body.collideWorldBounds = true;
		this._jugador.scale.setTo(0.25,0.25); //escalamos
		game.camera.follow(this._jugador);
		this._aim = 'left';
		this.cursores = game.input.keyboard.createCursorKeys(); //"listener" de eventos de teclado, declarando la variable cursores	
		this.JKey = game.input.keyboard.addKey(Phaser.Keyboard.J); //definimos la J
		this.cursores.up.onDown.add(this.saltar,this); //le añadimos a la tecla UP la funcion saltar
		this._basicBullets = new Bullets('bala', 300, 300, this); //balas añadidas en una clase, que hereda de la clase GroupFather
	}

	mueveIzquierda(){
		this._aim = 'left';
		this._jugador.body.velocity.x = -150; 
	}

	mueveDerecha(){
		this._jugador.body.velocity.x = 150;
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
		this._jugador.body.velocity.x = 0;  //reiniciamos variables...
		this._jugador.body.gravity.y = 150;

		//If del movimiento...
		if(this.cursores.left.isDown){ //si presiona izquierda
			this.mueveIzquierda();
		}
		else if(this.cursores.right.isDown){ //si presiona derecha
			this.mueveDerecha();
		}
		else if(this.cursores.down.isDown){
			this.apuntaAbajo();
		}

		if(this.JKey.isDown){
			this._basicBullets.shoot(this._aim);
		}

		if(this._jugador.body.touching.down){  
			this._contSaltos = 0;
		}

	}

	morir(){
		this._jugador.kill(); //destruye el objeto Jugador
	}

	//Aquí hacemos el saltito
	saltar(){
		if(this._contSaltos < 2){
			this._jugador.body.velocity.y = -200;
			this._contSaltos++;
		}
		this.apuntaArriba();
	}

	//Unos gets simples para saber las coordenadas del jugador y para devolvernos al propio jugador
	get x(){
		return this._jugador.x;
	}
	get y(){
		return this._jugador.y;
	}
	get jugador(){
		return this._jugador;
	}
}
