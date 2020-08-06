import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Swal from "sweetalert2";
import Usuarios from "./usuarios.js";

//Funciones para el registro del usuario
//Estructura formulario
//nombre usuario
//correo electronico
//confirmar correo electronico
//contraseña
//checkbox
leerLS();
window.revisar = function (input) {
  if (input.value == "") {
    input.className = "form-control is-invalid inputModales";
    return false;
  } else {
    input.className = "form-control is-valid inputModales";
    return true;
  }
};
window.revisarMail = function (input) {
  // Variable que contendra el formato a validar
  let expresion = /\w+@\w+\.[a-z]/;
  if (input.value != "") {
    if (expresion.test(input.value)) {
      input.className = "form-control is-valid inputModales";
      return true;
    } else {
      input.className = "form-control is-invalid inputModales";
      return false;
    }
  } else {
    input.className = "form-control is-invalid inputModales";
    return false;
  }
};
//Confirmar email
window.confirmarMail = function (input) {
  let mail = document.getElementById("email-registro");
  if (mailRegistro2.value != "" && mailRegistro2.value == mail.value) {
    input.className = "form-control is-valid inputModales";
    return true;
  } else {
    input.className = "form-control is-invalid inputModales";
    return false;
  }
};
window.revisarLongitud = function (input) {
  if (input.value != "" && input.value.length >= 8) {
    input.className = "form-control is-valid inputModales";
    return true;
  } else {
    input.className = "form-control is-invalid inputModales";
    return false;
  }
};
// //Busco el elemento
let revisarTerminos = document.getElementById("terminos-registro");
// //Agregar un evento
revisarTerminos.addEventListener("change", window.verificarCheckbox);
window.verificarCheckbox = function () {
  if (revisarTerminos.checked) {
    revisarTerminos.className = "form-check-input is-valid inputModales";
    return true;
  } else {
    revisarTerminos.className = "form-check-input is-invalid inputModales";
    return false;
  }
};
//validar datos ingresados
window.validar = function (event) {
  event.preventDefault();
  if (
    revisar(document.getElementById("usuario-registro")) &&
    revisarMail(document.getElementById("email-registro")) &&
    confirmarMail(document.getElementById("mailRegistro2")) &&
    revisarLongitud(document.getElementById("contrasena-registro")) &&
    verificarCheckbox()
  ) {
    enviarMail();
  } else {
    Swal.fire({
      icon: "error",
      title: "Hey!",
      text: "Formulario incompleto",
    });
  }
};
//guardar usuario en ls despues de validar y enviar mail
function almacenar(then) {
  if (then) {
    let userlist = [];
    let userName = document.getElementById("usuario-registro").value,
      email = document.getElementById("email-registro").value,
      password = document.getElementById("contrasena-registro").value;
    let _usuario = new Usuarios(userName, email, password, false);
    if (localStorage.length == 0) {
      userlist.push(_usuario);
      localStorage.setItem("users", JSON.stringify(userlist));
    } else {
      let _userList = JSON.parse(localStorage.getItem("users"));
      userlist = _userList;
      userlist.push(_usuario);
      localStorage.setItem("users", JSON.stringify(userlist));
    }
  }
}
//envio mail registro
function enviarMail() {
  console.log("Enviar mail");
  let template_params = {
    from_name: document.getElementById("usuario-registro").value,
    to_name: "Administrador",
    message_html: `Usuario: ${
      document.getElementById("usuario-registro").value
    }- 
     Mail: ${document.getElementById("email-registro").value} -
     Contraseña: ${document.getElementById("contrasena-registro").value} `,
  };
  let service_id = "default_service";
  let template_id = "template_tSgscJkf";
  emailjs.send(service_id, template_id, template_params).then(
    function (response) {
      almacenar(true);
      Swal.fire(
        "Felicidades!",
        "Su registro se ha enviado con exito!",
        "success"
      );
    },
    function (error) {
      almacenar(false);
      Swal.fire({
        icon: "error",
        title: "Vaya...",
        text: "Revisa tus datos hasta que esten correctos",
      });
    }
  );
}
//Login
//Debemos validar los datos
function validar() {
  if (
    window.revisarMail(document.getElementById("mailLogin")) &&
    window.revisarLongitud(document.getElementById("passLogin"))
  ) {
    return true;
  } else {
    return false;
  }
}
window.login = function (event) {
  let mail = document.getElementById("mailLogin").value;
  let pass = document.getElementById("passLogin").value;
  event.preventDefault();
  if (validar) {
    if (mail == "admin@gmail.com" && pass == 123456789) {
      window.location.href = "./admin.html";
     /* setTimeout(function () {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
        });
      },3000);*/
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "usuario o contraseña no existe. Por favor registrate",
      });
    }
  } else {
    return false;
  }
};

window.cambioRPG = function () {
  let codigoHTML = `<iframe src="RPGs.html" class="frameJuego"></iframe>`;
  let vista = document.getElementById("cartasJuegos");

  vista.innerHTML = codigoHTML;
};
window.cambioFutbol = function () {
  let codigoHTML = `<iframe src="futbol.html" class="frameJuego"></iframe>`;
  let vista = document.getElementById("cartasJuegos");

  vista.innerHTML = codigoHTML;
};
window.cambioCarreras = function () {
  let codigoHTML = `<iframe src="carreras.html" class="frameJuego"></iframe>`;
  let vista = document.getElementById("cartasJuegos");

  vista.innerHTML = codigoHTML;
};
window.cambioOnline = function () {
  let codigoHTML = `<iframe src="online.html" class="frameJuego"></iframe>`;
  let vista = document.getElementById("cartasJuegos");

  vista.innerHTML = codigoHTML;
};
/*let listaUsuarios = [];

window.leerUsuarios = function () {
    if (localStorage.length > 0) {
      let _listaUsers = JSON.parse(localStorage.getItem("users"));
      if (listaUsers.length == 0) {
        listaUsuarios = _listaUsers;
      }
     
      dibujarTablaUsuarios(_listaUsers);
    }
  }

leerUsuarios();*/

function leerLS() {
    if(localStorage.length > 0){
        
        let _listaProductos = JSON.parse(localStorage.getItem("juegoKey"));
       
        let listaProductos = _listaProductos.filter(function (producto) {
          
          return producto.destacado == true;
            
          });
        let principales = document.getElementById("principales");
         
        for(let i  in listaProductos){
          
            let codigoHTML = `
            
           
            <!-- FEATURED 3 -->
            <div class="carousel-item ${i==0 ?"active" :""}" data-interval="8000">
                <img src="img/games/${listaProductos[i].imagen1}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <div class="card">
                        <div class="card-body bg-dark">
                            <h3>${listaProductos[i].titulo} : ${listaProductos[i].descripcion}</h3>
                            <div class="flex-col text-center">
                                <a href="e404.html" target="_parent">
                                  <button href="e404.html" type="button" class="btn mt-1 text-light" id="bcompra">Demo</button>
                                </a>
                                <a href="e404.html" target="_parent">
                                  <button href="e404.html" type="button" class="btn mt-1 text-light" id="bcompra">Comprar</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
              principales.innerHTML += codigoHTML;
               }
            
              
              }
}
