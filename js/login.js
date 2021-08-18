//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    var login = () =>{
        var user = {};
        var loginBtn = document.getElementById('ingresar');
        var userLogin = document.getElementById('username');
        var userPass = document.getElementById('password');
        loginBtn.addEventListener('click', ()=>{
            if(userLogin.value.trim() === ''){
                alert('Necesita un nombre');
            }else if(userPass.value.trim() === ''){
                alert('Necesita una contraseña');
            }else{ 
                location.href = 'principal.html';
                user.nombre = userLogin.value;
                user.contraseña = userPass.value;
                user.estado = "conectado";
                sessionStorage.setItem('usuario', JSON.stringify(user));
            }
        });
    }
    login();
});