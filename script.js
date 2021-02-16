// 2. Obtené la referencia al botón y agregale un event listener para que cuando hagamos click se dispare un 
// pedido AJAX con la información de la ciudad elegida. El valor de la ciudad ingresada en el input debemos guardarlo 
// en una variable llamada "ciudad" y esta variable debemos concatenarla con la URL de la API.

let boton = document.querySelector('button');
boton.addEventListener('click', cargarCiudad)

// 1. Vinculá un archivo JavaScript a tu documento HTML y dentro del .js creá una función llamada "cargarCiudad". 
// Dentro de la función hacé un pedido AJAX ( $.getJSON) que traiga la información de la ciudad de Buenos Aires y 
// la muestre en la consola.

window.addEventListener('keydown', (returnOrEnter) => { // para que ademas del click tambien funcione con el enter
        (returnOrEnter.key == 'Enter') ? cargarCiudad():{}
    })    

function cargarCiudad () {

    let ciudad = document.querySelector('input').value

    $( document ).ajaxError(function() { // el fail del pledu no lo puede hacer funcionar. En documentacion de jquery
        throw alert("Nombre de ciudad inexistente (Error 404)"); // encontré esto.
      });

    if (ciudad == false) {
        alert("favor ingresar una ciudad") // alerta si no ingreso nada
    } else
          
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lang=es&q=" + ciudad + "&appid=95176c8edea30e33338e0eaddd53a916",
    function(data) {
        console.log(data.name)

// 3. Agrega la siguiente línea de código dentro de la función:

        document.querySelector('.container').style.visibility = 'visible'

// 3.1 El CSS del proyecto tiene seteado por defecto que no se muestre el div con la class="container". 
//     Con la línea de arriba hacemos que el div en el cual se mostraran las condiones climaticas pase a ser 
//     visible una vez que le hayamos dado click al botón.        

// 4.  Vamos a empezar mostrando en pantalla el nombre de la ciudad, que coincidirá obviamente con lo ingresado en el input. 
//     Para eso vamos a asignarle al span con el id="ciudad" el valor que posee la key llamada name, y 
//     para esto utilizaremos la propiedad textContent.

        document.querySelector('#ciudad').textContent = data.name

// 5.  Luego, siguiendo el mismo ejemplo que con la ciudad, vamos a tomar la temperatura actual.
//     Aclaración: La temperatura esta llegando en la escala Celsius (°C), esto esta especificado 
//     mediante la expresión units=metric, presente en la URL utilizada de Open Weather Map.
        
//     Ayuda: para obtener el simbolo de Celsius al lado de la temperatura deberas concanarle al 
//     código JavaScript generado, el siguiente string: <sup>°C</sup>.        
        
        document.querySelector('#temperatura').innerHTML = parseInt(data.main.temp-273.15) + "<sup>°C</sup>"

// 6 . Agregá la imagen que se corresponde a los datos recibidos. Para eso tenés que concatenar las 
//     distintas partes de la URL que indican la ubicación de la imagen, con el nombre de la imagen. Una URL 
//     donde se encuentra un ícono con una determinada condición climatica es la siguiente: http://openweathermap.org/img/w/01n.png.
        
        document.querySelector('#wicon').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        
        // 7. Obtené la descripción del clima actual.
        
        document.querySelector('#descripcion').textContent = data.weather[0].description

        console.log(data.cod)
        
        // Extra Credit:

// Cuando hagamos click en el botón debemos borrar el contenido del input.
        document.querySelector("input").value = ""
        
    })
}