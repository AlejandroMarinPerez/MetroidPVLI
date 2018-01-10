class Bee extends Enemies{
	constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player){
    	super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player);
    	this._speedAux = this.hSpeed;
    	this.fAux = this.movement;
    	this._timer = 0;
    	this._area = new Phaser.Rectangle(this.sprite.x - this.sprite.width*3, this.sprite.y, this.sprite.width*18, this.sprite.height*20);
    	this._TIME = 2000;
    	this._sprite.animations.add('quieto', [0], 1, false);
    	this._sprite.animations.add('volar', [0, 1], 15, true);
    }

    update(){
    	//game.debug.geom(this._area,'#0fffff');
    	this.colision();
    	this.movement();
    	this.respawn();
    }

    movement(){
    	if(this._player.player.body.x < this._area.x + this._area.width && this._player.player.body.x > this._area.x && this._player.player.body.y > this._area.y 
    		&& this._player.player.body.y < this._area.y + this._area.height || this._esta){
    		this._esta = true;
    		this.hSpeed = this._speedAux;
    		this._sprite.animations.play('volar');
    		this.moveRight(this.sprite,0);
    		this.moveDown(this.sprite,0);
    		this.compruebaAltura();
    	}
    }

    compruebaAltura(){
    	if(this._sprite.y >= this._player.y - this._sprite.height/2){
    		this._timer = game.time.now + this._TIME;
    		this._esta = false;
    		this.movement = function(){
    			this.hSpeed = this._speedAux;
    			this.moveRight(this.sprite, 0);
    			if(this._player.y < this._sprite.y - this._sprite.height || game.time.now > this._timer){
    				this.subida();
    			}
    		};
    	}
    }

    subida(){
    	this.movement = function(){
    			this.moveUp(this.sprite, 0);
    			this.hSpeed = this._speedAux;
    			this.moveRight(this.sprite, 0);
    			this.posarse();
    		};
    }

    posarse(){
    	if(this.sprite.body.blocked.up){
    		this._sprite.animations.play('quieto');
    		this._speedAux *= -1;
    		this._timer = game.time.now + this._TIME;
    		this.movement = function(){ if(game.time.now > this._timer){this.movement = this.fAux}};
    	}
    }
}