/*
Clase madre de todos los enemigos, gestiona el movimiento básico y el daño
que hacen al jugador y que reciben del jugador.
*/
class Enemies extends Movable{
  //A los enemigos igual hay que añadirles gravedad, pero ya se va viendo
  //Constructor of the enemies
  constructor(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type){
    super(posX, posY, sprite, gravity, speedX, speedY);
    this._typeGameObject = 'enemie'; //Para los grupos y los accesos a ellos
    this._damage = damage; //Damage to the player
    if (type === 0){ //Tipo de enemigo que serán, pero sólo diferencia entre tanques y normales
      this._lives = lives; //Hit points
    }
    else {
      this._lives = lives * 2; //Hit points of a tank
    }
  }

  ///---------------Daño y demás interacciones-----------------///
  receiveDmg(damage){ //Función para que los enemigos reciban daño y mueran eventualmente
    this._lives -= damage;

    if (this._lives <= 0){
      this.death();
    }
  }

  doDamage(player){ //Calcula el daño que recibe el jugador sin modificarla todavía
    var vida = player._player.health;
    
    return vida -= this._damage;
  }

  death(){ //Muerte de los enemigos (podría estar en GameSprite?)
    this.kill();
  }
}
