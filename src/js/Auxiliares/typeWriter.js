function typeWriter(){ //Animacion de máquina de escribir para el texto
  //Obtenida de la siguiente persona por su github:https://github.com/netgfx/Phaser-typewriter
/*The MIT License (MIT)
Copyright (c) 2015 Michael Dobekidis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
  //Está modificada a nuestras necesidades
	this.typedText;
	this.timer;
	this.pickedQuote;
	var _that = this;
	var game;

	function init(gameObj, properties){
		game = gameObj;
		_that.time = properties.time || Phaser.Timer.SECOND / 10;
		_that.sound = properties.sound || null; //De momento se queda null
		_that.soundMaker = properties.soundMaker || null;
		_that.writerFn = properties.writerFn || null;
    _that.endFn = properties.endFn || null;
    _that.times = properties.times || 10;
    _that.text = properties.text || "";
    _that.x = properties.posX || 0;
    _that.y = properties.posY || 0;
    _that.maxWidth = properties.width || 200;
    _that.fontFamily = properties.fontFamily || "blackFont";
    _that.fontSize = properties.fontSize || 28;
    _that.writerObj = properties.writerObj || null;
	}

  function start() {
    enableTypingSpecificMessage(_that.text, _that.x, _that.y);
  }

  function stop() {
    if (_that.timer !== undefined){
      _that.timer.stop();
      game.time.events.remove(_that.timer);
    }
    if (_that.sound !== null){
      _that.sound.stop();
    }
  }

  function enableTypingSpecificMessage(text, x, y){
    if (_that.writerObj === null) {
      	_that.typedText = game.add.bitmapText(x, y, _that.fontFamily, text, _that.fontSize);
				_that.typedText.fixedToCamera = true;
    } else {
        _that.typedText = _that.writerObj;
    }
    _that.typedText.maxWidth = _that.maxWidth;
    _that.currentLetter = 0;
    var length = _that.typedText.children.length;

    for (var i = 0; i < length; i++) {
        var letter = _that.typedText.getChildAt(i);
        letter.alpha = 0;
    }

    if (_that.sound !== null) { // Made some alterations for sound markers here. ~Tilde
        if (_that.soundMarker !== null)
            _that.sound.play(_that.soundMarker, null, 1, true, true);
        else
            _that.sound.play('', null, 1, true, true);
    }

    _that.typedText.x = x;
    _that.typedText.y = y;
    if (_that.endFn !== null) {
        countdown(typeWriter, length, _that.endFn);
    } else {
        countdown(typeWriter, length);
    }
  }

  //Time between characters, es configurable
  function countdown (fn, times, endFn){
    var _timer = game.time.create(false);
    _timer.start();
    endFn = endFn || function(){
      game.time.events.remove(_timer);
      if(_that.sound !== null){
        _that.sound.stop();
      }
    };
    _timer.onComplete.add(endFn);
    _timer.repeat(_that.time, times, fn, this);
    _that.timer = _timer;
  }

  function typeWriter(text){
    if(_that.sound !== null){
      if(_that.sound.isPlaying === false){
        _that.sound.play();
      }
    }
    var letter = _that.typedText.getChildAt(_that.currentLetter);
    letter.alpha = 1;
    _that.currentLetter++;
  }

  return {
    init: function (gameObj, properties){
			console.log(gameObj);
      init (gameObj, properties);
    },
    start: function(){
      stop();
      start();
			destroy();
    },
    destroy: function(){
      _that.typedText.destroy();
    },
  }
}
