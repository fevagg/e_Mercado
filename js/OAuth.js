let user = {};
function onSignIn(googleUser) {
    var checkbox = document.getElementsByClassName('form-check-input');
    var profile = googleUser.getBasicProfile();
    user.nombre = profile.getName();
    user.estado = 'conectado';
    location.href = 'principal.html'
    if(checkbox[0].checked){
        localStorage.setItem('usuario', JSON.stringify(user));
    }else{
        sessionStorage.setItem('usuario', JSON.stringify(user));
    }
}
function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    location.href = 'index.html';
    auth2.signOut().then(function () {
        localStorage.clear();
        sessionStorage.clear();
        console.log('done');
    });
}