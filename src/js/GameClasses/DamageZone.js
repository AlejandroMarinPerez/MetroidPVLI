class DamageZone extends GameSprite {
	constructor(posX, posY, sprite, gravity, player){
		super(posX, posY, sprite, gravity);
		this._player = player;
		this.setImmovable(true);
	}

	update(){
		game.physics.arcade.overlap(this._player.player, this.sprite, this.damage, null, this);
	}

	damage(player){
		player.class.hSpeed = 50;
		player.class.immune(true, 1);
		if(player.class.normal != null){
			player.class.normal();
		}
		player.class._puedeTrans = false;
	}
}