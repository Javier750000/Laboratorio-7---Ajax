$(document).ready(function()
{
  let temas=["Dog", "Cat", "Rabbit", "Hamster", "Skunk", "Goldfish", "Bird", "Ferret", "Turtle", "Sugar glider"]
  for(let i=0; i<temas.length; i++)
  {
    $("#animal-buttons").append(`<button class="botón"> ${temas[i]}</button>`)
  }
  $("#add-animal").on("click", agregarNuevoElemento);
  $("#animal-buttons").on("click", ".botón", realizarBúsqueda)
  $("body").on("click", ".animal-item", animar)
  
  function agregarNuevoElemento(e)
  {
    e.preventDefault()
    let texto=$("#animal-input").val()
    $("#animal-buttons").append(`<button class="botón"> ${texto}</button>`)
  }
  
  function realizarBúsqueda()
  {
    $("#animals").empty()
    let textoABuscar=$(this).text()
    let búsqueda=$.get("https://api.giphy.com/v1/gifs/search",
    {
      api_key: "9h6BnFnX7feVx91M1ZUtlAFOC2LRT5yx",
      q: textoABuscar,
      limit: 10,
    })  
    búsqueda.done(function(resultado)
    {
      for(let i=0; i<resultado.data.length; i++)
      {
        let imagen=$("<img>")
        imagen.attr("src", resultado.data[i].images.fixed_height_still.url)
        imagen.attr("quieto", resultado.data[i].images.fixed_height_still.url)
        imagen.attr("movimiento", resultado.data[i].images.fixed_height.url)
        imagen.attr("estado", "quieto")
        imagen.addClass("animal-item")
        let clasificación=$(`<div id="clasificación"><p>Rating: ${resultado.data[i].rating}</p></div>`).append(imagen)
        $("#animals").append(clasificación)
      }
    })
  }

  function animar()
  {
    let estado=$(this).attr("estado")
    if(estado=="quieto")
    {
      $(this).attr("src", $(this).attr("movimiento"))
      $(this).attr("estado", "movmiento")
    }
    else
    {
      $(this).attr("src", $(this).attr("quieto"))
      $(this).attr("estado", "quieto")
    }
  }
});