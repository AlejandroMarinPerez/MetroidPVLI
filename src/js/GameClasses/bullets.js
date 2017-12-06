class Bullets extends GroupFather{
	constructor(sprite, speed, range, shooter, ammo){
		super();
		//Balas
		this._balas = this._group;
		this._balas.createMultiple(15, sprite); //creamos 20 balas, y luego las reutilizamos tooodo el rato
		this._balas.setAll('outOfBoundsKill', true); //hacemos que desaparezcan al chocar con los limites
		this._balas.setAll('checkWorldBounds', true);//comprueba que no se ha chocado con nada
		for(var i = 0; i < this._balas.length; i++){
			this._balas.children[i].scale.setTo(0.15, 0.15); //escalamos sprite & collider
			this._balas.children[i].body.setSize(0.15,0.15);
			this._balas.children[i].animations.add('normal',[0], 0, true);
			this._balas.children[i].animations.add('expl', [1], 0, true);
		}	
		this._tiempoBala = 0;
		this._shooter = shooter;
		this._speed = speed;
		this._range = range;
		this._ammo = ammo;

	}

	shoot(aim){
		if(game.time.now > this._tiempoBala && (this._ammo > 0 || this._ammo === null)){
			var bal = this._balas.getFirstExists(false); //cogemos la primera bala
			bal.animations.play('normal');
			//bal.body.onCollide = new Phaser.Signal();
			console.log(aim);
			if(aim === 'left'){
				bal.reset(this._shooter.x - 10, this._shooter.y + 15); //le marcamos su posicion inicial
				bal.angle = -90;
				bal.body.velocity.x = -this._speed;
			}
			else if(aim === 'right'){
				bal.reset(this._shooter.x + 35, this._shooter.y); //le marcamos su posicion inicial
				bal.angle = 90;
				bal.body.velocity.x = this._speed;
			}
			else if(aim  === 'up'){
				bal.reset(this._shooter.x + 5, this._shooter.y - 20); //le marcamos su posicion inicial
				bal.angle = 0;
				bal.body.velocity.y = -this._speed;
			}
			this._tiempoBala = game.time.now + 250; //temporizador para que no dispare chorrocientas balas de golpe
			bal.lifespan = this._range; //rango de la bala peeeeero lo he medido en tiempo, no queda mal y no es dificil de hacer asi que ¯\_(ツ)_/¯
			if(this._ammo !== null){
				this._ammo--;
				if(this.ammo === 0){
					this._shooter.changeBullets();
				}
			}
			if(this.ammo !== null)
			playState.energiaText.text = 'EN: ' + this._shooter.health + '\nAMMO: ' + this.ammo; //canvas por probar cosas
		}

		//los numeritos son para cuadrar las balas (no me mola, pero los anchors...)
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