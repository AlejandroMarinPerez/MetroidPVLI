class ObjectPot extends GameSprite{
	constructor(posX, posY, sprite, gravity, type, player){
		super(posX, posY, sprite, gravity);
		this._type = type;
		this._player = player;
		this.sprite.animations.add('def', [0, 1, 2, 3], 8, true);
		this.sprite.animations.play('def');
	}

	update(){
		game.physics.arcade.overlap(this._player.player,this.sprite, this.activarMejora, null, this);
	}

	activarMejora(){
		this.kill();
		if(this._type < 5){
			this._player.activarMejoras(this._type);
			playState._potActivados++;
		}
		else if(this._type == 5){
			this._player._rockets.ammo += 5;
		}
		else{
			this._player.heal(this._player._maxHealth);
		} 

	}
}