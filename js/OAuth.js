let usuario = {};
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    usuario.nombre = profile.getName();
    usuario.estado = 'conectado';
    location.href = 'principal.html'
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
}
function init() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      auth2.disconnect();
      console.log('done')
    });
    localStorage.clear();
}
document.addEventListener('DOMContentLoaded', ()=>{
    var discBtn = document.getElementById('user');
    discBtn.addEventListener('click', ()=>{
        localStorage.clear();
        signOut();
        location.href = 'index.html';
    });
})