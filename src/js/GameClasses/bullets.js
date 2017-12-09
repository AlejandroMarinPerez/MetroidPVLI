class Bullets extends MovableGroup{
	constructor(sprite, speed, range, shooter, ammo){
		super(speed);
		//Balas
		this._balas = this.group;
		this._balas.createMultiple(15, sprite); //creamos 20 balas, y luego las reutilizamos tooodo el rato
		this._balas.setAll('outOfBoundsKill', true); //hacemos que desaparezcan al chocar con los limites
		this._balas.setAll('checkWorldBounds', true);//comprueba que no se ha chocado con nada
		for(var i = 0; i < this._balas.length; i++){
			this._balas.children[i].scale.setTo(0.10, 0.10); //escalamos sprite & collider
			this._balas.children[i].body.setSize(0.2,0.2);
			this._balas.children[i].animations.add('normal',[0], 0, true);
			this._balas.children[i].animations.add('expl', [1], 0, true);
		}	
		this._tiempoBala = 0;
		this._shooter = shooter;
		//this._speed = speed;
		this._range = range;
		this._ammo = ammo;

	}

	shoot(aim){
		if(game.time.now > this._tiempoBala){
			var bal = this._balas.getFirstExists(false); //cogemos la primera bala
			bal.animations.play('normal');
			this.gestionaBala(aim ,bal); //elige direcciom , ajusta el rango, el tiempo...
			this.gestionAmmo(); //municion
		}
	}

	gestionaBala(aim , bullet){
		if(aim === 'left'){
			bullet.reset(this._shooter.x - 25, this._shooter.y - 1); //le marcamos su posicion inicial
			this.moveLeft(bullet, -90);
		}
		else if(aim === 'right'){
			bullet.reset(this._shooter.x + 25, this._shooter.y - 11); //le marcamos su posicion inicial
			this.moveRight(bullet, 90);
		}
		else if(aim  === 'up'){
			var x = this.aux();
			bullet.reset(this._shooter.x + x, this._shooter.y - 42); //le marcamos su posicion inicial
			this.moveUp(bullet, 0);
		}
		this._tiempoBala = game.time.now + 250; //temporizador para que no dispare chorrocientas balas de golpe
		bullet.lifespan = this._range; //rango de la bala peeeeero lo he medido en tiempo, no queda mal y no es dificil de hacer asi que ¯\_(ツ)_/¯
		//los numeritos son para cuadrar las balas (no me mola, pero los anchors...)
	}

	gestionAmmo(){
		if(this._ammo !== null){ //reducir la municion de los misiles
			this._ammo--;
			if(this.ammo === 0){
				this._shooter.changeBullets(); //se cambia automáticamente
			}
		}
		if(this.ammo !== null)
			playState.energiaText.text = 'EN: ' + this._shooter.health + '\nAMMO: ' + this.ammo; //canvas por probar cosas
	}

	aux(){ //metodo auxiliar para ajustar la posicion de la bala si apunta arriba
		var x;
		if(this._shooter._ultimaDir == 1){
			x = 0;
		}
		else{
			x = - 10;
		}
		return x;
	}

	set range(newRange){  //para cambiar el rango de la bala, lo necesitaremos
		this._range = newRange;
	}

	get grupoBalas(){
		return this._balas;
	}

	get ammo(){
		return this._ammo;
	}

	set ammo(amount){
		this._ammo = amount;
	}


	//faltan metodos en plan daño y eso pero por ahora ta bien
}