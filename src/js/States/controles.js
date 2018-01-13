var ControlesState = {
	//imagen
	create: function(){
		var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		escKey.onDown.addOnce(this.menu, this);
	},

	menu: function(){
		game.state.start('menu');
	},

};