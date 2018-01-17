var menuState = {

	create: function(){
		//Vamos a hacer un menú muy sencillito, donde ponga el menu de juego y
		//solo tengas que darle a una tecla para continuar
		//establecemos las coordenadas (80,80), el texto que queremos que ponga,
		//la fuente, el tamaño y el color
		//var titulo = game.add.text(80,80, 'Al fin sabemos Phaser', {font: '50px Arial', fill: '#FFF'});
		//Lo mismo que arriba, esta vez la "y" se pilla de la altura del juego
		//var texto = game.add.text(80, game.world.height - 80, 'Press "Space" to start', {font: '25px Arial', fill: '#FFF'});
		var bckAux = new Phaser.Sprite(game, 0, 0, 'menuAux'); //auxiliares para rellenar la pantalla totalmente(que queda to feo si no)
		game.world.add(bckAux);
		var bckAux2 = new Phaser.Sprite(game, game.width - 50, 0, 'menuAux');
		game.world.add(bckAux2);

		this.backgroundImage = new Phaser.Sprite(game, 25, 0, 'menu'); //menu animado
		game.world.add(this.backgroundImage);
		var anim = this.backgroundImage.animations.add('start', game.math.numberArray(0,12), 3, false);
		this.backgroundImage.animations.add('full', game.math.numberArray(13,19), 3, true);
		anim.onComplete.add(this.startAnimation, this); //cuando acabe, empieza la otra animacion
		this.backgroundImage.play('start');

		//Aquí es donde irá todo lo de la música del menú
		this.tema = game.add.audio('maintheme', 0.3);
		this.tema.play();
		this._tema = true;

		//Aqui definiremos la tecla enter/espacio para poder hacer cositas con ella
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//Cuando alguien presione el espacio/enter, llamaremos a la funcion "start" o "controles"
		/*enterKey.onDown.addOnce(this.start, this); //se añade una vez esa funcion, en este estado
		space.onDown.addOnce(this.controles, this);*/
	},

	update: function(){
		if(this.enterKey.isDown){
			this.start();
		}
		else if(this.space.isDown){
			this.controles();
		}

		if(!this.tema.isPlaying && this._tema)
		{
			 this.tema.play();
		}
	},

	start: function(){
		//llamamos al siguiente estado --> Play
		this.tema.stop();
		this._tema = false;
		game.state.start('play');
	},

	controles: function(){
		game.state.start('controles');
	},

	startAnimation:function(){
		this.backgroundImage.play('full');
	},
};
