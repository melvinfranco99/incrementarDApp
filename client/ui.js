const formulario1 = document.querySelector('#formulario1'); //llamo al que tiene como id 'formulario1'

formulario1.addEventListener("submit", e => { //llamar al evento que me proporciona el boton del formulario
    e.preventDefault(); //recordarle a la aplicacion que no cargue cada vez que le doy al boton
    console.log("El boton funciona correctamente"); //sacar por pantalla que realmente cuando pulso el boton hace lo que le pido dentro de esta funcion
    App.incrementar();
});