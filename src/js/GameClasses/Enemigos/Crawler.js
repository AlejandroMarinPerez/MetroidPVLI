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
    //this.sprite.body.setSize(this.sprite.width, this.sprite.height/10);
    //Estos bool son para configurar bien el movimiento entre trepar y colgar
    /*this._vertical = false;  //Para que trepe por las paredes
    this._cuelga = false;   //Para que se mueva por el techo
    this._tocaPantalla = false;  //Para que cambie la dir*/
    this._fAux = this.cambioMovement;
  }

  comprueba_Block(x, y){
  	return (playState.map._map.getTileWorldXY(x + this._crawler.width, y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x - this._crawler.width, y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x, y - this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x, y + this._crawler.height,32,32, playState.map._blockedLayer) === null);
  }
  cambioMovement(){ //paso, lo voy a hacer dandole colisiones propias a los bichejos estos, da´más trabajo en el mapa pero bueno
  	game.debug.body(this._crawler);
  	console.log(playState.map._map.getTileWorldXY(this._crawler.x - this._crawler.width, this._crawler.y + this._crawler.height -this._crawler.height -this._crawler.height,32,32, playState.map._blockedLayer) )
  	if(this.comprueba_Block(this._crawler.body.x, this._crawler.body.y)){
  		var lef = this.comprueba_Block(this._crawler.x - this._crawler.width, this._crawler.y);
  		var rig = this.comprueba_Block(this._crawler.x + this._crawler.width, this._crawler.y);
  		var up = this.comprueba_Block(this._crawler.x , this._crawler.y - this._crawler.height - this._crawler.height);
  		var dow = this.comprueba_Block(this._crawler.x , this._crawler.y + this._crawler.height);
  		console.log(up)
  		if(!lef && this._dir !== -1 && this._dir !== 1){
  			this._dir = -1;
  			this.movement = function(){
  				this.moveLeft(this._crawler, 0);
  			}
  		}

  		 else if(!rig && this._dir !== 1 && this._dir !== -1){
  		 	this._dir = 1;
  			this.movement = function(){
  				this.moveRight(this._crawler, 0);
  			}
  		}

  		else if(!dow && this._dir !== -2 && this._dir !== 2){
  			this._dir = -2;
  			this.movement = function(){
  				this.moveDown(this._crawler, 0);
  			}
  		}

  		else if(!up && this._dir !== 2 && this._dir !== -2){
  			this._dir = 2;
  			this.movement = function(){
  				this.moveUp(this._crawler, 0);
  			}
  		}

  	}
  	/*if(this._crawler.body.onWall() && !this._trepa){
  		this._VSpeedAux *= -1;
  		this._trepa = true;
  		this._dir = -1;
  		this._cuelga = false;
  	}
  	else if(this._crawler.body.blocked.up && !this._cuelga){
  		this._HSpeedAux *= -1;
  		this._dir = 1;
  		this._trepa = false;
  		this._cuelga = true;
  	}
  	else if(this._crawler.body.onFloor()){
  		this._dir = 1;
  		this._trepa = false;
  		this._cuelga = false;
  	}*/
  	if(this._crawler.body.blocked.right){
  		this._noBlock = false;
  		this._dir = -2;
  		this.movement = function(){
  			this.moveDown(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.left){
  		this._noBlock = false;
  		this._dir = 2;
  		this.movement = function(){
  			this.moveUp(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.up){
  		this._noBlock = false;
  		this._dir = 1;
  		this.movement = function(){
  			this.moveRight(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.down){
  		this._noBlock = false;
  		this._dir = -1;
  		this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  		};
  	}
  	/*if(!this._noBlock && playState.map._map.getTileWorldXY(this._crawler.body.x + this._crawler.width, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x - this._crawler.width, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x, this._crawler.body.y - this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null){
 		console.log('wut');
 		if(this._dir === 2){
 			this._dir = -1;
 			this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  			};
 		}
 		else if(this._dir === -2){
 			this._dir = 1;
 			this.movement = function(){
  			this.moveRight(this._crawler, 0);
  		};
 		}
 		else if(this._dir === 1){
 			this._dir = -2;
  		this.movement = function(){
  			this.moveDown(this._crawler, 0);
  		};
 		}
 		else if(this._dir === -1){
 			this._dir = 2;
  		this.movement = function(){
  			this.moveUp(this._crawler, 0);
  		};
 		}
 		this._noBlock = true;
  	}

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
    	this.hSpeed = this._HSpeedAux;
  		this.moveRight(this._crawler, 0);
  	}
  	else{
  		this.vSpeed = this._VSpeedAux;
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
