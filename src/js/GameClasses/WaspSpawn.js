class WaspSpawn extends GameSprite{
	constructor(posX, posY, sprite, gravity, time, player){
		super(posX, posY, sprite, gravity);
		this._time = time;
		this._timer = 0;
		this._player = player;
		this._bichito = new Wasp(this.sprite.body.x, this.sprite.body.y, 0,'wasp', 250, 350, 0, 10, 7, 0, this._player);
		this._bichito._lives = 0;
	}

	spawn(){
		this._bichito.sprite.revive(); //revive al bicho, le devuelve sus vidas y lo resetea a la pos inicial
		this.rotacionSprite();
		//this._bichito.sprite.tint = Math.random() * 0xffffff //mola?
		this._bichito._lives = 10;
		this._bichito.sprite.body.x = this.sprite.body.x;
		this._bichito.sprite.body.y = this.sprite.body.y;
		this._bichito._direccionTomada = false;
	}

	update(){
		this._bichito.update();
		this.timing();
	}

	timing(){
		if(game.time.now > this._timer && this.esta_Cerca()){
			this.spawn();
			this._timer = game.time.now + Math.floor(Math.random() * (this._time - this._time/2) + this._time/2); //no sé si he hecho bien este random , teoricamente genera un numero entre this._time/2 y this._time
		}
	}

	esta_Cerca(){
		return (this._player.player.body.x < this.sprite.body.x + 250 && this._player.player.body.x > this.sprite.body.x - 250);
	}

	rotacionSprite(){
		if(this._player.player.body.x >= this.sprite.body.x){
			this._bichito.sprite.scale.x = -1;
		}
		else{
			this._bichito.sprite.scale.x = 1;
		}
	}
}