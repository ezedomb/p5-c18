let botonChuck = document.getElementById('boton');
botonChuck.addEventListener('click', function () {
    $.getJSON('https://api.chucknorris.io/jokes/random?category=dev',
        function (data) {
            let chuck_quote = document.getElementById('chuck-quote');
            chuck_quote.innerHTML = JSON.stringify(data.value);
        })
})

var result = $('#result')

result.hide().html('<%= j @result %>').fadeIn(50);
playAudio(result);

function playAudio(result){
  if (result.html() === "Yes"){

    $('#yes-audio').trigger('play')
  }
  else if (result.html() === "Nope."){
    $('#no-audio').trigger('play')
  }
 
}