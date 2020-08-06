import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../css/style.css'
import Juego from './juego.js'
import $ from "jquery"
import Swal from 'sweetalert2'
import Usuarios from "./usuarios.js"

/*setTimeout(function () {
    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
    });
  },3000);*/
console.log('msje', window.location.href)
let saludo_bienvenida = window.location.href;
if(saludo_bienvenida.includes("admin")){
    Swal.fire({
        icon: "success",
        title: "Bienvenido Administrador",
      });
}

let listaJuegos = [];
leerProductos();
let productoExistente = false; //Cuando la variable sea "false" es igual a agregar un producto y cuando es igual a "true" es igual a editar un producto.
let categoriaSeleccionada = document.getElementById('categoria');

window.agregarJuego = function () {
    let codigo = listaJuegos.length;
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let categoria = categoriaSeleccionada.options[categoriaSeleccionada.selectedIndex].text;
    let desarrollador = document.getElementById('desarrollador').value;
    let editor = document.getElementById('editor').value;
    let videoURL = document.getElementById('videoURL').value;
    let imagen1 = document.getElementById('imagen1').value;
    let imagen2 = document.getElementById('imagen2').value;
    let imagen3 = document.getElementById('imagen3').value;
    let imagen4 = document.getElementById('imagen4').value;
    let destacado = false;

    let nuevoJuego = new Juego(codigo, titulo, descripcion, categoria, desarrollador, editor, videoURL, imagen1, imagen2, imagen3, imagen4,destacado);

    listaJuegos.push(nuevoJuego);
    localStorage.setItem("juegoKey", JSON.stringify(listaJuegos));

    limpiarFormulario();
    leerProductos();

    let ventanaModal = document.getElementById("modalFormulario");
    $(ventanaModal).modal("hide");
    if ($('.modal-backdrop').is(':visible')) {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };

    Swal.fire(
        'Producto agregado!',
        'Tu producto se agregó correctamente',
        'success'
    )
}


window.revisarProducto = function (input) {
    if (input.value === "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

window.limpiarFormulario = function () {
    let formulario = document.getElementById('formProducto');
    formulario.reset();
    productoExistente = false;
}

function leerProductos() {
    if (localStorage.length > 0) {

        let _listaJuegos = JSON.parse(localStorage.getItem("juegoKey"));
        if (listaJuegos.length == 0) {
            listaJuegos = _listaJuegos;
        }
        borrarTabla();
        dibujarTabla(_listaJuegos);
    }
}

function dibujarTabla(_listaJuegos) {
    let tablaJuego = document.getElementById("tablaJuego");

    let codHTML = "";

    for (let i in _listaJuegos) {
        codHTML = `<tr>
        <th scope="row">${_listaJuegos[i].codigo}</th>
        <td><div class="compJuegos">${_listaJuegos[i].titulo}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].descripcion}</div></td>
        <td>${_listaJuegos[i].categoria}</td>
        <td><div class="compJuegos">${_listaJuegos[i].desarrollador}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].editor}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].videoURL}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].imagen1}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].imagen2}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].imagen3}</div></td>
        <td><div class="compJuegos">${_listaJuegos[i].imagen4}</div></td>
        <td>
          <button class="btn btn-outline-info" onclick="modificarProducto(${_listaJuegos[i].codigo})"><i class="far fa-edit"></i></button>
          <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_listaJuegos[i].codigo}"><i class="far fa-trash-alt"></i></button>
          <button class="btn btn-outline-warning" onclick="destacarProducto(this)" id="${_listaJuegos[i].codigo}"><i class="far fa-star"></i></button>
        </td>
      </tr>`;
        tablaJuego.innerHTML += codHTML;
    }
}

function borrarTabla() {
    let tablaJuego = document.getElementById("tablaJuego");
    if (tablaJuego.children.length > 0) {
        while (tablaJuego.firstChild) {
            tablaJuego.removeChild(tablaJuego.firstChild);
        }
    }
}

window.eliminarProducto = function (botonEliminar) {
    if (localStorage.length > 0) {
        let _listaJuegos = JSON.parse(localStorage.getItem("juegoKey"));
        Swal.fire({
            title: 'Estás seguro?',
            text: "No vas a poder revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.value) {
                let datosFiltrados = _listaJuegos.filter(function (producto) {
                    return producto.codigo != botonEliminar.id;
                });
                localStorage.setItem("juegoKey", JSON.stringify(datosFiltrados));
                leerProductos();
                listaJuegos = datosFiltrados;
                Swal.fire(
                    'Juego borrado',
                    'Tu producto ha sido eliminado correctamente',
                    'success'
                )
            } else {
                Swal.fire(
                    'Cancelado!',
                    'Tu producto está a salvo.',
                    'info'
                )
            }
        });
    }
}

window.destacarProducto = function (botonDestacar){
    if (localStorage.length > 0){
       
        let _listaJuegos = JSON.parse(localStorage.getItem("juegoKey"));

        let objetoEncontrado = _listaJuegos.find(function (producto) {
            return producto.codigo == botonDestacar.id;
        })
        console.log(objetoEncontrado)
       /* let datosFiltrados = _listaJuegos.filter(function (producto) {
            return producto.codigo != botonDestacar.id;
        });*/

        /*objetoEncontrado.destacado=true;*/

        for (let i in _listaJuegos) {
            
                
           
            if (_listaJuegos[i].codigo==botonDestacar.id) {
                if (_listaJuegos[i].destacado==true) {
                    _listaJuegos[i].destacado=false;
                    Swal.fire(
                        'Producto No destacado!',
                        'Tu producto se quito de la lista de destacados correctamente',
                        'success'
                    )
                    
                } else {
                    _listaJuegos[i].destacado=true; 
                    Swal.fire(
                        'Producto destacado!',
                        'Tu producto se destacó correctamente',
                        'success'
                    )
                }
               
                
                
            }
            
            else{
                if (_listaJuegos[i].categoria == objetoEncontrado.categoria) {
                   

                    _listaJuegos[i].destacado=false;
                }
            }
        
       
        }
     
        localStorage.setItem("juegoKey", JSON.stringify(_listaJuegos));
        
    }
   
   
    /*Agregar código para destacar producto
       Swal.fire(
        'Producto destacado!',
        'Tu producto se destacó correctamente',
        'success'
    )*/
}

window.modificarProducto = function (codigo) {
    //Buscar el objeto del producto
    let objetoEncontrado = listaJuegos.find(function (producto) {
        return producto.codigo == codigo;
    })
    //Cargar los datos en el formulario
    document.getElementById("codigo").value = objetoEncontrado.codigo;
    document.getElementById("titulo").value = objetoEncontrado.titulo;
    document.getElementById("descripcion").value = objetoEncontrado.descripcion;
    categoriaSeleccionada.options[categoriaSeleccionada.selectedIndex].text = objetoEncontrado.categoria;
    document.getElementById("desarrollador").value = objetoEncontrado.desarrollador;
    document.getElementById("editor").value = objetoEncontrado.editor;
    document.getElementById("videoURL").value = objetoEncontrado.videoURL;
    document.getElementById("imagen1").value = objetoEncontrado.imagen1;
    document.getElementById("imagen2").value = objetoEncontrado.imagen2;
    document.getElementById("imagen3").value = objetoEncontrado.imagen3;
    document.getElementById("imagen4").value = objetoEncontrado.imagen4;
    
    let ventanaModal = document.getElementById("modalFormulario");
    $(ventanaModal).modal("show");
    productoExistente = true;
}

window.agregarModificar = function (event) {
    event.preventDefault();
    if (productoExistente == false) {
        //Quiero agregar un nuevo producto
        agregarJuego();
    } else {
        //Modificar un producto
        Swal.fire({
            title: 'Seguro que querés modificar el producto?',
            text: "No será posible revertir los cambios!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Modificar'
        }).then((result) => {
            if (result.value) {
                guardarProductoModificado();
                Swal.fire(
                    'Producto modificado!',
                    'Tu producto fué modificado exitosamente.',
                    'success'
                )
            }
        })
    }
}

function guardarProductoModificado() {
    let codigo = document.getElementById('codigo').value;
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let categoria = categoriaSeleccionada.options[categoriaSeleccionada.selectedIndex].text;
    let desarrollador = document.getElementById('desarrollador').value;
    let editor = document.getElementById('editor').value;
    let videoURL = document.getElementById('videoURL').value;
    let imagen1 = document.getElementById('imagen1').value;
    let imagen2 = document.getElementById('imagen2').value;
    let imagen3 = document.getElementById('imagen3').value;
    let imagen4 = document.getElementById('imagen4').value;

    for (let i in listaJuegos) {
        if (listaJuegos[i].codigo == codigo) {
            listaJuegos[i].titulo = titulo;
            listaJuegos[i].descripcion = descripcion;
            listaJuegos[i].categoria = categoria;
            listaJuegos[i].desarrollador = desarrollador;
            listaJuegos[i].editor = editor;
            listaJuegos[i].videoURL = videoURL;
            listaJuegos[i].imagen1 = imagen1;
            listaJuegos[i].imagen2 = imagen2;
            listaJuegos[i].imagen3 = imagen3;
            listaJuegos[i].imagen4 = imagen4;
        }
    }
    localStorage.setItem("juegoKey", JSON.stringify(listaJuegos));

    leerProductos();
    limpiarFormulario();

    let ventanaModal = document.getElementById("modalFormulario");
    $(ventanaModal).modal("hide");
}

document.getElementById('codigo').placeholder = listaJuegos.length;



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
  }
  //Confirmar email
  window.confirmarMail = function (input) {
    let mail = document.getElementById('email-registro');  
      if ( mailRegistro2.value != "" && mailRegistro2.value == mail.value) {
        input.className = "form-control is-valid inputModales";
        return true;
      } else {
        input.className = "form-control is-invalid inputModales";
        return false;
      }
  }
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
  }
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
      let ventanaModal = document.getElementById("modalRegistro");
      $(ventanaModal).modal("hide");
      if ($('.modal-backdrop').is(':visible')) {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
    } else {
      Swal.fire({
        icon: "error",
        title: "Hey!",
        text: "Formulario incompleto",
      });
    }
  }
  //guardar usuario en ls despues de validar y enviar mail
  function almacenar(then) {
    if (then) {
        let userlist = [];
        let userName = document.getElementById("usuario-registro").value,
        email = document.getElementById("email-registro").value,
        password = document.getElementById("contrasena-registro").value;
        let _usuario = new Usuarios(userName, email, password, false);
        if (!localStorage.getItem("users")) {
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
    let template_params = {
      "from_name": document.getElementById("usuario-registro").value,
      "to_name": "Administrador",
      "message_html": `Usuario: ${ document.getElementById("usuario-registro").value}- 
       Mail: ${document.getElementById("email-registro").value} -
       Contraseña: ${document.getElementById("contrasena-registro").value} `
    }
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
          text:  "Revisa tus datos hasta que esten correctos"
        });
      }
    );
  }
  //Login
  //Debemos validar los datos
  function validar(){
    if(window.revisarMail(document.getElementById('mailLogin'))&&
    window.revisarLongitud(document.getElementById('passLogin'))
    ){
      return true;
    } else {
      return false;
    }
  }
  window.login = function (event){
    let mail = document.getElementById('mailLogin').value;
    let pass = document.getElementById('passLogin').value;
    event.preventDefault();
    if(validar){
      if(mail == 'admin@gmail.com' && pass == 123456789){
        window.location.href = './admin.html';
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'usuario o contraseña no existe. Por favor registrate',
        })
      }
    } else{
      return false;
    }
  }

  let listaUsuarios = [];

window.leerUsuarios = function () {
    if (localStorage.length > 0) {
      let _listaUsers = JSON.parse(localStorage.getItem("users"));
      if (!localStorage.getItem("users")) {
        listaUsuarios = _listaUsers;
      }
     
      dibujarTablaUsuarios(_listaUsers);
    }
  }

leerUsuarios();

  function  dibujarTablaUsuarios(_listaUsers){
    let tablaUsuario = document.getElementById("tablaUsuario");

    let codHTML = "";

    for (let i in _listaUsers) {
        codHTML = `<tr>
        <th scope="row">${_listaUsers[i].userName}</th>
        <td><div>${_listaUsers[i].email}</div></td>`;
        tablaUsuario.innerHTML += codHTML;
    }
}
