//CLASE CANVAS, gestiona las imagenes y el texto que aparece en pantalla. Por ahora solo texto.

class Canvas{
	//Arrays de game.Text y de strings, para cambiarlos cuando sea necesario
	constructor(){
		this._elemArray = [];
		this._texts = [];
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		this._img = [];
		this._prop = 1;
	}

//--------------------------------------------------------------------UPDATE------------------------------------------------------------------
	updateCanvas(){
		for(var i = 0; i < this._elemArray.length; i++){
			this._elemArray[i].text = this._texts[i];
		}
	}

//-------------------------------------------------------------------MODIFICACION DEL CANVAS--------------------------------------------------

	addText(i, text, font,color){
		this._texts.push(text);
		console.log(this._img[i]);
		this._text = game.add.text(this._img[i].x + this._img[i].width/1.1, this._img[i].y, text, {fontSize: font, fill: color});
		this._text.fixedToCamera = true;
		this._elemArray.push(this._text);
	}

	setText(i, text){
		this._texts[i] = text;
	}

	addImage(i, img){
		this._img[i] = game.add.image(game.width/22, game.height/8 * this._prop, img);
		this._img[i].fixedToCamera = true;
		this._prop+=0.5;
	}
}
