class Group{
	//Contructor del grupo,  en caso de necesitar un grupo de Sprites igualarias el sprite al grupo para obtenerlo
	constructor(){
		this._group = game.add.group();
		this._group.enableBody = true;
	}

	get group(){
		return this._group;
	}

	/*createEnemies (enemies){ //para crear los enemigos
		this._group.create(enemies.x, enemies.y, 'spike');
	}*/
}
