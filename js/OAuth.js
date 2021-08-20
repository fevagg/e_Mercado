let usuario = {};
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    usuario.nombre = profile.getName();
    usuario.estado = 'conectado';
    location.href = 'principal.html'
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.clear();
      console.log('done');
      location.href = 'index.html';
    });
}