const urlPeliculas = 'https://japceibal.github.io/japflix_api/movies-data.json';
let arrayPeliculas = [];
let contenidoBuscador;

function getJSONData(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

function busquedaCoincide(pelicula){
    let cond1 =  ((pelicula.title.toLowerCase().indexOf(contenidoBuscador) > -1) || (pelicula.overview.toLowerCase().indexOf(contenidoBuscador) > -1) || (pelicula.tagline.toLowerCase().indexOf(contenidoBuscador) > -1));
    let cond2 = false;
    for (let genero of pelicula.genres) {
        cond2 = (cond2 || (genero.name.toLowerCase().indexOf(contenidoBuscador) > -1));
    }
    return (cond1 || cond2);
}

function cargarPelicula(){
    
}

// title o genres o tagline u overview
function mostrarPeliculas(arrayPeliculas){
    let contenidoHTML = '';
    let lista = document.getElementById("lista");
    let generos = "";
    for (let pelicula of arrayPeliculas) {
        
        if((contenidoBuscador != undefined) && (contenidoBuscador != "") && busquedaCoincide(pelicula)){
            let contador = 1;
            for (let genre of pelicula.genres) {
                generos += `${genre.name} - `;
            }
            generos = generos.substring(0,generos.length -2)

            stars = ""
            let i = 0
            score = (Math.round(pelicula.vote_average)/2)-1;
            console.log(score)
            while(i<score){
                stars += `<span class="fa fa-star checked"></span>`
                i++
            }
            if( Number.isInteger(score) == false) {
                stars += `<span class="fa fa-star-half-o checked"></span>`
                i++
            } else {stars += `<span class="fa fa-star checked"></span>`
                i++
            }
            while(i<5){
                stars += `<span class="fa fa-star-o"></span>`
                i++
            }
            
            contenidoHTML += `
            <li class="list-group-item bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <div class="row">
                    <div class="col-8 col-sm-9 col-md-10 col-xl-11 text-white">
                        <h5>${pelicula.title}</h5>
                        <p class="text-muted">${pelicula.tagline}</p>
                    </div>
                    <div class="col-4 col-sm-3 col-md-2 col-xl-1 text-white">
                        <p>${stars}</p>
                    </div>
                </div>
            </li>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="offcanvasTopLabel">${pelicula.title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p>${pelicula.overview}</p>
                    <hr>
                    <div class="row">
                        <div class="col-9 col-sm-10 col-lg-11">
                            <p class="text-muted">${generos}</p>
                        </div>
                        <div class="col-3 col-sm-2 col-lg-1">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Más
                                </button>
                                <ul class="dropdown-menu">
                                    <li>Año: ${pelicula.release_date.split('-')[0]}</li>
                                    <li>Duración: ${pelicula.runtime} mins</li>
                                    <li>Presupuesto: $${pelicula.budget}</li>
                                    <li>Ganancias: $${pelicula.revenue}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
            `;
        }
    }
    lista.innerHTML = contenidoHTML;
}

document.addEventListener("DOMContentLoaded",function(){
    getJSONData(urlPeliculas).then(resultado => {
        if(resultado.status == "ok"){
            arrayPeliculas = resultado.data;
        }
    });

    document.getElementById("btnBuscar").addEventListener("click",function(){
        contenidoBuscador = document.getElementById("inputBuscar").value;
        contenidoBuscador = contenidoBuscador.toLowerCase();
        mostrarPeliculas(arrayPeliculas);
    });

    
})