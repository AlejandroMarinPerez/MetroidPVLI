class Canvas{
	constructor(){
		this._elArray = [];
		this._texts = [];
	}

	addText(posX, posY, text, font ,color){
		this._texts.push(text);
		this._text = game.add.text(posX, posY, text, {fontSize: font, fill: color});
		this._text.fixedToCamera = true;
		this._elArray.push(this._text);
	}

	updateCanvas(){
		for(var i = 0; i < this._elArray.length; i++){
			this._elArray[i].text = this._texts[i];
		}
		console.log(this._texts[0]);
	}

	setText(i, text){
		this._texts[i] = text;
	}
}