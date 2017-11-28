class GameSprite{
	constructor(posX, posY, sprite, gravity, scaleX, scaleY){
		this._sprite = game.add.sprite(posX, posY, sprite); //iniciamos todo lo del jugador
		game.physics.arcade.enable(this._sprite);
		this._sprite.body.bounce.y = 0;
		this._sprite.body.gravity.y = gravity; //fisicas varias
		this._sprite.body.collideWorldBounds = true;
		this._sprite.scale.setTo(scaleX,scaleY); //escalamos
	}

	get sprite(){
		return this._sprite;
	}
}