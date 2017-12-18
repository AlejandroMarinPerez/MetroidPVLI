class GameSprite{
	//Constructor de los sprites básicos de Phaser, en su posicion, su prite, su gravedad...
	constructor(posX, posY, sprite, gravity){
		this._sprite = game.add.sprite(posX, posY, sprite); //iniciamos todo lo del jugador
		game.physics.arcade.enable(this._sprite);
		this._sprite.body.bounce.y = 0;
		this._sprite.body.gravity.y = gravity;
		this._sprite.body.collideWorldBounds = true;
	}

	kill(){
		this._sprite.kill();
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	get sprite(){
		return this._sprite;
	}

	set sprite(sprite){
		this._sprite = sprite;
	}
}
