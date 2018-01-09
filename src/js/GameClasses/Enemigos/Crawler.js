//Los crawler son los enemigos que se mueven por el suelo
//hacen daño al jugador si los toca y pueden trepar paredes
//Además si detectan que el jugador está en su mismo plano
//Se mueven más rápido.
class Crawler extends Enemies {
  //COnstructor del Crawler
  constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player){
    super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player);
    this._crawler = this._sprite;
    this._crawler.class = this;
    this._dir = 1;
    this._VSpeedAux = this.vSpeed;
    this._HSpeedAux = this.hSpeed;
    this._trepa = false;
    this._cuelga = false;
    //Estos bool son para configurar bien el movimiento entre trepar y colgar
    /*this._vertical = false;  //Para que trepe por las paredes
    this._cuelga = false;   //Para que se mueva por el techo
    this._tocaPantalla = false;  //Para que cambie la dir*/
    this._fAux = this.cambioMovement;
  }

  cambioMovement(){
  	console.log(this._crawler.body.onCeiling());
  	/*if(this._crawler.body.onWall()){
  		if(!this._trepa){
  		this._VSpeedAux *= -1;
  		this.movement = function(){
  					this.vSpeed = this._VSpeedAux;
  					this.moveUp(this._crawler, 0);
  				};
  		this._trepa = true;
  		this._cuelga = false;
  		}
  	}
  	else if(!this._cuelga){
  		this._HSpeedAux *= -1;
  		this._cuelga = true;
  		this._trepa = false;
  		this.movement = function(){
  					this.hSpeed = this._HSpeedAux;
  					this.moveRight(this._crawler, 0);
  				};
  	}
  	/*if(this._col){
  		switch(this._dir){
  			case 1:
  				this._crawler.body.y 
  				this._HSpeedAux *= -1;
  				this._dir = 0;
  				this.movement = function(){
  					this.hSpeed = this._HSpeedAux;
  					this.moveRight(this._crawler, 0);
  				};
  				break;
  			case 0:
  				this._VSpeedAux *= -1;
  				this._dir = 1;
  				this.movement = function(){
  					this.vSpeed = this._VSpeedAux;
  					this.moveUp(this._crawler, 0);
  				};
  				break;
  			}
  			this._col = false;
  		}*/
  }
  update(){
  	this.colision();
  	this.movement();
  	this.cambioMovement();
  	this.respawn();
  }

  movement(){
  	if(this._dir === 1){
  		this.moveRight(this._crawler, 0);
  	}
  	else{
  		this.moveUp(this._crawler, 0);
  	}

  }
  ///-------------Lógica del crawler-----------///
 /* movement(){
    //Siempre se moverá hacia la dir del player hasta que choque con la pantalla

    if (!this._vertical && !this._cuelga){
      this.moveRight(this._, 0);
    }
    //O trepará una pared
    else if (this._vertical && !this._cuelga){
      this.moveUp(this._crawler, 90);
    }
    //O colgará del techo
    else if (!this._vertical && this._cuelga){
      this.moveLeft(this._crawler, 180);
    }
    else if (this._vertical && this._cuelga){
      this.moveDown(this._crawler, 270);
    }
  }*/
}
