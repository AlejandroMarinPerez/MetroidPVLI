//Los crawler son los enemigos que se mueven por el suelo
//hacen daño al jugador si los toca y pueden trepar paredes
//Además si detectan que el jugador está en su mismo plano
//Se mueven más rápido.
class Crawler extends Enemies {
  //COnstructor del Crawler
  constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type){
    super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type);
    this._crawler = this._sprite;
    this._crawler.anchor.setTo(0.5, 0.5);
    //Estos bool son para configurar bien el movimiento entre trepar y colgar
    this._vertical = false;  //Para que trepe por las paredes
    this._cuelga = false;   //Para que se mueva por el techo
    this._tocaPantalla = false;  //Para que cambie la dir
  }

  ///-------------Lógica del crawler-----------///
  movement(){
    //Siempre se moverá hacia la dir del player hasta que choque con la pantalla

    if (!this._vertical && !this._cuelga){
      this.moveRight(this._, 0);
    }
    //O trepará una pared
    else if (this._vertical && !this._cuelga){
      this.moveUp(this._crawler, 90);
    }
    //O colgará del techo
    else if (!this._vertical && this._cuelga){
      this.moveLeft(this._crawler, 180);
    }
    else if (this._vertical && this._cuelga){
      this.moveDown(this._crawler, 270);
    }
  }
}
