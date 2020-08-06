import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Swal from "sweetalert2";
import Usuarios from "./usuarios.js";


window.revisar = function (input) {
    if (input.value == "") {
        input.className = "form-control is-invalid inputModales";
        return false;
    } else {
        input.className = "form-control is-valid inputModales";
        return true;
    }
};

window.revisaremail = function (input) {
    // expresion regular del formato email
    let expresion = /\w+@\w+\.[a-z]/;

    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid inputModales";
            return true;
    } else {
        input.className = "form-control is-invalid inputModales";
        return false;
    }
}

 


window.revisarConsulta = function (input) {
    if (input.value != "" && input.value.length >= 12) {
        input.className = "form-control is-valid inputModales"
        return true;
    } else {
        input.className = "form-control is-invalid inputModales"
        return false;
    }
}

window.validar = function(event){
    event.preventDefault();

   if(revisar(document.getElementById('nombre')) && 
   revisar(document.getElementById('nombrepais')) && 
   revisaremail(document.getElementById('mail')) &&
   revisarConsulta(document.getElementById('consulta'))
   ){
       sendMail();
   } else{
       Swal.fire({
           icon: 'error',
           title: 'STOP',
           text: 'Completa el formulario'
       })
   }
};

function sendMail(){
    let template_params = {
        "from_name": document.getElementById('nombre').value,
        "to_name": "Administrador",
        "message_html": `${document.getElementById("consulta").value} - 
        Email: ${document.getElementById("mail").value}`
     }
     
     let service_id = "default_service";
     let template_id = "template_tSgscJkf";
     emailjs.send(service_id, template_id, template_params).then(
         function (response){
         Swal.fire(
             'Listo!',
             'Consulta enviada con exito',
             'success'
         )
         
     },
     function(error){
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Al parecer hubo un error. Verifica tus datos'
         })
     }
     )
}

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