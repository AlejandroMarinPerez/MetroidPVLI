//CLASE CANVAS, gestiona las imagenes y el texto que aparece en pantalla. Por ahora solo texto.

class Canvas{
	//Arrays de game.Text y de strings, para cambiarlos cuando sea necesario
	constructor(){
		this._dialog = false; //Variable que controla si hay o no conversación
		this._elemArray = [];
		this._texts = [];
		this._dialogs = [];
		console.log('box');
		this._textBox = game.add.image(0, 470, 'box');
		this._textBox.visible = false;
		this._textBox.fixedToCamera = true;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		//Valores fijos
		//Nombre del que habla
		this._posNombreX = 150;//Posición X
		this._posNombreY = 15;//Posición Y
		//Posición del texto
		this._textX = 150;
		this._textY = 32;
		//Anchura
		this._maxTextWidth = 515;
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

	dialog(){ //Esta funcion escribe los diálogos
		var that = this;
		this._textBox.visible = true;
		//Primero cargamos el díalogo desde un JSON
		$.getJSON('assets/Canvas/Conversations/prueba.json', function(data){
			this._dialogs = data.dialog;
			write(this._dialogs);
		});
		//Sacamos el cuadro de diálogo
		//Después escribimos los dialogos con el efecto
		function write (dialogs){
			for (var i = 0; i < dialogs.length; i++){
				var text = new typeWriter();
				text.init(game,{
					posX: that.textX,
					posY: that.textY,
					fontFamily: 'desyrel',
					fontSize: 20,
					maxWidth: 50,
					text: dialogs[i].Comment
				});
				text.start();
			}
		}

	}
}
