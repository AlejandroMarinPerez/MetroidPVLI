//CLASE CANVAS, gestiona las imagenes y el texto que aparece en pantalla. Por ahora solo texto.

class Canvas{
	//Arrays de game.Text y de strings, para cambiarlos cuando sea necesario
	constructor(){
		this._elemArray = [];
		this._texts = [];
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
	}

//--------------------------------------------------------------------UPDATE------------------------------------------------------------------
	updateCanvas(){
		for(var i = 0; i < this._elemArray.length; i++){
			this._elemArray[i].text = this._texts[i];
		}
	}

//-------------------------------------------------------------------MODIFICACION DEL CANVAS--------------------------------------------------

	addText(posX, posY, text, font ,color){
		this._texts.push(text);
		this._text = game.add.text(posX, posY, text, {fontSize: font, fill: color});
		this._text.fixedToCamera = true;
		this._elemArray.push(this._text);
	}

	setText(i, text){
		this._texts[i] = text;
	}
}
