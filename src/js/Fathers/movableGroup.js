class MovableGroup extends GroupFather{
	constructor(speed){
		super();
		this._speed = speed;
	}

	moveRight(object, angle){
		object.body.velocity.x = this._speed;
		object.angle = angle;
	}

	moveLeft(object, angle){
		object.body.velocity.x = -this._speed;
		object.angle = angle;
	}

	moveUp(object, angle){
		object.body.velocity.y = -this._speed;
		object.angle = angle;
	}

	moveDown(object, angle){
		object.body.velocity.y = this._speed;
		object.angle = angle;
	}

	set speed(newSpeed){
		this._speed = newSpeed;
	}
}