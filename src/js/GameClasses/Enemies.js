/*
Clase madre de todos los enemigos, gestiona el movimiento básico y el daño
que hacen al jugador y que reciben del jugador.
*/
class Enemies extends Movable{
  //A lo enemigos igual hay que añadirles gravedad, pero ya se va viendo
  //Constructor of the enemies
  constructor(posX, posY, sprite, speedX, speedY, colliders, lives, damage, type){
    super(posX, posY, sprite, gravity, speedY, speedX);
    this._damage = damage; //Damage to the player
    if (type === 0){ //Tipo de enemigo que serán, pero sólo diferencia entre tanques y normales
      this._lives = lives; //Hit points
    }
    else {
      this._lives = lives * 2; //Hit points of a tank
    }
  }
  //--------------Movement of the enemies-------------//
  
}
