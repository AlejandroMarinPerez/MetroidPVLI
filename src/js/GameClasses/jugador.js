class Player extends GameSprite{
	constructor(posX, posY, sprite, gravity, scaleX, scaleY){
		super(posX, posY, sprite, gravity, scaleX, scaleY);

		this._player = this._sprite; //asignacion con el sprite del padre para que el nombre sea mas legible
		game.camera.follow(this._player);
		//game.camera.view = new Phaser.Rectangle(posX, posY, 1000, 1000);
		this._aim = 'left';
		this.define_Keys();
		this._basicBullets = new Bullets('bala', 300, 300, this); //balas añadidas en una clase, que hereda de la clase GroupFather
		this._player.animations.add('normal', [0], 10, true);
		this._player.animations.add('bolita', [1], 10, true);
		this._bola = false;
		this._width = this._player.body.width;
		this._height = this._player.body.height;
		this.previousY;
		this._potenciadores = [false, false, false]; //array de potenciadores activados... por ahora lo hacemos asi hasta que se nos ocurra algo mejor
		console.log(this._height + '       ' + this._width);
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

	bolita(){ //se transforma en bola
		this._bola = true;
		this._player.body.setSize(this._width, this._height/2); //cambia los colliders
	}

	normal(){ //vuelve a la normalidad
		if(this._bola){
			this._bola = false;
			this._player.body.setSize(this._width, this._height);
			this._player.body.y = this.previousY;
		}
	} 	

	update(){ //update del jugador, se reinicia la velocidad, la gravedad y comprueba si choca o no con el suelo, los eventos de teclado
		this.cambia_Anim(this._bola);
		this._player.body.velocity.x = 0;  //reiniciamos variables...
		this._player.body.gravity.y = 250;
		this.handle_Events();
		/*if(this._player.body.touching.down){
			this._contSaltos = 0;
		}*/
	}

	morir(){
		this._player.kill(); //destruye el objeto Jugador
	}

	//Aquí hacemos el saltito
	saltar(){
		if(this._player.body.velocity.y === 0 && !this._bola){
			this._player.body.velocity.y = -250;
			//this._contSaltos++;
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
		else if(this.cursores.up.isDown){
			this.apuntaArriba();
			this.normal();
		}
		else if(this.cursores.down.isDown && this._player.body.velocity.y === 0 && this._potenciadores[0]){ //para que no pueda transformarse saltando
			if(!this._bola){
				this.previousY = this._player.y; //para que el jugador vuelva a la altura de siempre
				this.bolita();
			}
		}

		if(this.JKey.isDown){
			this._basicBullets.shoot(this._aim);
		}
	}

	cambia_Anim(){
		if(!this._bola){
			this._player.animations.play('normal');
		}
		else{
			console.log('snif');
			this._player.animations.play('bolita');
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
	set_Potenciadores(i, bool){
		this._potenciadores[i] = bool;
	}
}
