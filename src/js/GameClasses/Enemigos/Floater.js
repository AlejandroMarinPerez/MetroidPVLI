//Los floater son unos enemigos que se mueven de
//izda a dcha y son invulnerables al daño. Además,
//flotan.
class Floater extends Enemies {
  //COnstructor del floater
  constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type){
    super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type);
    this._floater = this._sprite;
    this._floater.class = this;
    this._floater.anchor.setTo(0.5, 0.5);
    this.movement();
  }

  ///-------------Lógica del floater-----------///
  movement(){ //si se llama a esta función desde el main: cambia la veloc para que patrulle de un lado a otro
      this.moveLeft(this._floater, 0);
  }
}
