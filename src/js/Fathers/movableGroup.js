class MovableGroup extends GameSprite{
	constructor(posX, posY, sprite, gravity, hSpeed, vSpeed){
		super(posX, posY, sprite, gravity);
		this._hSpeed = hSpeed;
		this._vSpeed = vSpeed;
	}

	moveRight(object, angle){
		object.body.velocity.x = this._hSpeed;
		object.angle = angle;
	}

	moveLeft(object, angle){
		object.body.velocity.x = -this._hSpeed;
		object.angle = angle;
	}

	moveUp(object, angle){
		object.body.velocity.y = -this._vSpeed;
		object.angle = angle;
	}

	moveDown(object, angle){
		object.body.velocity.y = this._vSpeed;
		object.angle = angle;
	}

	get vSpeed(){
		return this._vSpeed;
	}
	get hSpeed(){
		return this._hSpeed;
	}
	set hSpeed(newSpeed){
		this._hSpeed = newSpeed;
	}
	set vSpeed(newSpeed){
		this._vSpeed = newSpeed;
	}
}