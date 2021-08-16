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
            function onSignIn(googleUser) {
                // Useful data for your client-side scripts:
                var profile = googleUser.getBasicProfile();
                console.log('Full Name: ' + profile.getName());
                console.log('Given Name: ' + profile.getGivenName());
                console.log('Family Name: ' + profile.getFamilyName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());
        
                // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;
                console.log("ID Token: " + id_token);
              }
        });
    }
    login();
});