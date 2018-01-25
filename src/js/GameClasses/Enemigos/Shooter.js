class Shooter extends Enemies{ //Este enemigo es el especial que dispara y salta para busca a Samantha

  //--------------------------------Construccion del enemigo------------------------
  constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player, range, viewRange){
    super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player);
    this._range = range;
    this._Balas = new Bullets ('bala2', 200, 40, this.sprite, null, false);
    this._viewRange = viewRange;
    this._posIniX = posX;
    this._posIniY = posY;
    this._shooter = this.sprite;
    this.declaraAnimaciones();
    this._animacion = 'normal';
    this._aim = 'right';
    this._firing = false;
  }

  declaraAnimaciones(){
    this._shooter.animations.add('normal', [1], 0, true);
    this._shooter.animations.add('salto', [19], 0, true);
    this._shooter.animations.add('caida', [20], 0, true);
    this._shooter.animations.add('andar', [3, 4, 5], 8, true);
    this._shooter.animations.add('apArriba', [2], 0, true);
    this._shooter.animations.add('shootJump', [16], 0, true);
    this._shooter.animations.add('fallShoot', [17], 0, true);
    this._shooter.animations.add('runShoot', [15, 16, 17], 8, true);
    this._shooter.animations.add('runUpShoot', [18, 19, 20], 8, true);
    this._shooter.animations.add('morir', [24, 25, 26], 2, false);
  }


  update(){
    if(!this._haMuerto){
      this.colision();
      //Copmprobamos la lógica primero (si muere, pues no se activa y esas cosas)
      if(Math.abs((this._player.x - this.posX)) < this._viewRange){
        this.logic();
        this.animaEnemigo();
      }
    }
    //Ya después si muere, pues eso, que se muere Y comprueba si puede revivir
    else {
      this.morir();
      this.loot();
      this.respawn();
    }
  }

  logic(){
    if (this._player.x > this.posX){ //Tratará de perseguir al jugador hasta que esté dentro de su rango
      this.mueveDerecha(this.sprite, 0);
      if(Math.abs((this._player.x - this.posX)) > this._range){ //Comprueba si dispara o no
        this._Balas.shoot(this._aim);
      }
    }
    else if (this._player.x() < this.posX){
      this.mueveIzquierda(this.sprite, 0);
      if(Math.abs((this._player.x - this.posX)) < this._range){
        this._Balas.shoot(this._aim);
      }
    }
  }

  //---------------------------------Animaciones del enemigo--------------
  resetAnimaciones(){
     //si no es bola y toca el suelo, pone la animacion normal, si es bola, pone la animacion de bola. Ajusta el aim también
		if(this._shooter.body.onFloor())
		  this.cambiaAnimacion('normal');
			if(this._shooter.scale.x === -1){
  			this._aim = 'left';
			}
			else{
				this._aim = 'right';
			}
	}

  morir(){
    this.cambiaAnim('morir'); //cambia la animacion
    this.Anima();
    this.sprite.body.moves = false;
    this._shooter.animations.currentAnim.killOnComplete = true; //cuando acaba a animacion, muere
  }

  animaEnemigo(){
    this._shooter.animations.play(this._animacion);
  }

  cambiaAnimacion(animacion){
    if(this._animacion !== 'morir')
      this._animacion = animacion;
  }

  //--------------------------------Movimiento--------------------------------------
  mueveIzquierda(){ //mueve el enemigo a la izquierda, guarda su direccion y gestiona sus animaciones
		this._aim = 'left';
		this.moveLeft(this._shooter, 0);
		this._ultimaDir = -1;
		if(this._shooter.body.onFloor()){
			if(this._firing)
				this.cambiaAnim('runShoot');
			else
				this.cambiaAnim('andar');
		}
		this._shooter.scale.x = -1;
	}

	mueveDerecha(){ //mueve el enemigo a la derecha, guarda su direccion y gestiona sus animaciones
		this._aim = 'right';
		this.moveRight(this._shooter, 0);
		this._ultimaDir = 1;
		if(this._shooter.body.onFloor()){
			if(this._firing)
				this.cambiaAnim('runShoot');
			else
				this.cambiaAnim('andar');
		}
		this._shooter.scale.x = 1;
	}
}
