let user = {};
function onSignIn(googleUser) {
    var checkbox = document.getElementsByClassName('form-check-input');
    var profile = googleUser.getBasicProfile();
    user.nombre = profile.getName();
    user.estado = 'conectado';
    user.photo = profile.getImageUrl();
    user.email = profile.getEmail();
    user.firstName = profile.getGivenName();
    user.lastName = profile.getFamilyName();
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
    auth2.signOut().then(function () {
        localStorage.clear();
        sessionStorage.clear();
    });
    location.href = 'index.html';
}