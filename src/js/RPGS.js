import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';



leerLS();

function leerLS() {
    if(localStorage.length > 0){
      console.log("hola")
        let _listaProductos = JSON.parse(localStorage.getItem("juegoKey"));
        let listaProductos = _listaProductos.filter(function (producto) {
            return producto.categoria == "RPG";
          });
        let catalogo = document.getElementById("catalogo");

        for(let i  in listaProductos){
          
          let codigoHTML = ` 
          <div class="compensiframe" id="publicacion">
        <div class="card-body row col-sm-12">
        <div class="col-sm-9">
          <h1 id="cardtitle">${listaProductos[i].titulo}</h1><div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="false">
          <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators${i}" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators${i}" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators${i}" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators${i}" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators${i}" data-slide-to="4"></li>
        </ol>
          <div class="carousel-inner text-center">
        <div class="carousel-item active">
        <div class="videowrapper">
        <iframe src="${listaProductos[i].videoURL}" frameborder="0" allow="accelerometer"></iframe>
        </div>
        </div>
        <div class="carousel-item">
          <img src="img/games/${listaProductos[i].imagen1}" class="d-block w-100"
            alt="Imagen del juego">  
        </div>
        <div class="carousel-item">
          <img src="img/games/${listaProductos[i].imagen2}" class="d-block w-100"
            alt="Imagen del juego">
        </div>
        <div class="carousel-item">
          <img src="img/games/${listaProductos[i].imagen3}" class="d-block w-100"
            alt="Imagen del juego">
        </div>
        <div class="carousel-item">
          <img src="img/games/${listaProductos[i].imagen4}" class="d-block w-100"
            alt="Imagen del juego">
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
      </div>
      </div>
      </div>
      <div class="col-lg-3">
        <h4 class="mt-5 ml-3" id="infogame">${listaProductos[i].descripcion}</h4>
        <div class="mt-3 d-flex justify-content-between">
          <div class="col">
            <h1 id="subtit">DESERROLLADOR</h1>
            <p id="infogame">${listaProductos[i].desarrollador}</p>
          </div>
          <div class="col">
            <h1 id="subtit">EDITOR:</h1>
            <p id="infogame">${listaProductos[i].editor}</p>
          </div>
      </div>
      <div class="mt-3 d-flex justify-content-between">
          <a href="e404.html"target="_parent">
            <button href="e404.html" type="button" class="btn mt-1" id="bcompra">Demo</button>
          </a>
          <a href="e404.html"target="_parent">
            <button href="e404.html" type="button" class="btn mt-1" id="bcompra">Comprar</button>
          </a>
          </div>
      </div>
      </div>
      <hr>`;
          catalogo.innerHTML += codigoHTML;        }
    }
}