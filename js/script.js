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
    for (let pelicula of arrayPeliculas) {
        
        if((contenidoBuscador != undefined) && (contenidoBuscador != "") && busquedaCoincide(pelicula)){
            contenidoHTML += `
            <li class="list-group-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <h5>${pelicula.title}</h5>
                <p>${pelicula.tagline}</p>
                <p>${pelicula.vote_average}</p>
            </li>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="offcanvasTopLabel">${pelicula.title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p>${pelicula.overview}</p>
                    <hr>
                    <p>genero</p>
                    <button class="btn"></button>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu">
                            <li>Año: ${pelicula.}</li>
                            <li>Another action</li>
                            <li>Something else here</li>
                        </ul>
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