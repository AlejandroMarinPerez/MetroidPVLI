/*
Clase madre de todos los enemigos, gestiona el movimiento básico y el daño
que hacen al jugador y que reciben del jugador.
*/
class Enemies extends Movable{
  //A los enemigos igual hay que añadirles gravedad, pero ya se va viendo
  //Constructor of the enemies
  constructor(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player){
    super(posX, posY, sprite, gravity, speedX, speedY);
    this.sprite.body.immovable = true;
    this.sprite.anchor.setTo(0.5, 0.5); //ancla
    this._damage = damage; //Damage to the player
    this._player = player;
    this._velocityTimer = 0; //tiempo el cual los enemigos son frenados al ser disparados (igual que en el juego original)
    this._hSpeedAux = this.hSpeed;
    this._vSpeedAux = this.vSpeed;
    if (type === 0){ //Tipo de enemigo que serán, pero sólo diferencia entre tanques y normales
      this._lives = lives; //Hit points
    }
    else {
      this._lives = lives * 2; //Hit points of a tank
    }
    this._seChoca = colisionParedes;
  }

  colision(){
  		game.physics.arcade.overlap(this.sprite, this._player.player, this.damagePlayer, null, this); //overlap con el jugador
  		for(var i = 0; i < this._player._arrayBalas.length; i++){ //colision con las balas del jugador
			 game.physics.arcade.collide(this.sprite, this._player._arrayBalas[i], function(enemie, bullet){bullet.animations.play('expl');bullet.lifespan = 100;this.get_Damaged();}, null, this);
		  }
      if(this._seChoca){ //hay algunos enemigos que atraviesan paredes (avispas)
       game.physics.arcade.collide(this.sprite, this._seChoca);
      }
		  this.reset();
  }

  damagePlayer(){
  	this._player.recoil_Damage(this.sprite.body.x, this._damage); //llama al método de rebote, daño e invulnerabilidad del jugador
  }

  get_Damaged(){
  	this._lives--;
  	this.hSpeed = 10;  //quita vida, reduce su velocidad y empieza el timer de velocidad bajada
  	this.vSpeed = 10;
  	this._velocityTimer = game.time.now + 300;
  }

  reset(){
  	if(game.time.now > this._velocityTimer){
  		this.hSpeed = this._hSpeedAux;  //resetea las velocidades (si ha sido ralentizado le devuelve su velocidad normal) y comprueba si ha muerto
  		this.vSpeed = this._vSpeedAux;
  	}
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  	this.killThisShit();
  }

 killThisShit(){
 	if(this._lives <= 0){ //si sus vidas son iguales o menores a 0, muere o_O
 		this.kill();
 	}
 }
 //RESPAWNNNN y LOOOOOOT
}
