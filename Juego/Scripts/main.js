var numero1 = 1;
var suma = 0;
var numero2 = 1;
var control = false;
var numero3 = 0;
var numeroRec = 0;

function HelloDarknes(){
    console.log("Hello Darkness My Old Friend");
}

function Suma(){
    suma += numero1 + numero2;
    console.log("Estado actual " + suma);
    return suma;
}

function SumaEnBucle(){
    while (!control){
        if (suma >= 50)
            control = true;
        else
            suma = Suma();
    }
    console.log("Gracias por participar " + suma);
    numeroRec = factorial(suma);

    console.log(numeroRec);
}

function llamaaFuncion(){
  factorial (10);
}

function factorial(numeroRec){
    if (numeroRec === 0)
        return 1;
    else
        numeroRec *= factorial(numeroRec - 1);

    console.log(numeroRec);
    return numeroRec;
}

window.onload = function(){
  var button = document.getElementById('summon');
    button.addEventListener('click', function () {
      var sorpresa = "Número " + numeroRec + "sorpresa";
      var img = new Image();
      img.src = 'https://placekitten.com/g/200/200/';
      document.getElementById('kittens').appendChild(img);
      document.body.innerHTML.getElementById('kittens').appendChild(img);
    });
}
