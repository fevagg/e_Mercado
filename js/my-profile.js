let usuario = JSON.parse(localStorage.getItem('usuario')) != null ? JSON.parse(localStorage.getItem('usuario')) : JSON.parse(sessionStorage.getItem('usuario'));

function setPhoto() {
    let photo = document.getElementById('profilePhoto');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();
  
    reader.onloadend = () =>{
        photo.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
       photo.src = "https://thispersondoesnotexist.com/image";
    }
}

function setProfileData(){
    document.getElementById("btn").addEventListener('click', (e)=>{
        e.preventDefault();
        usuario.firstName = document.getElementById("nombre").value;
        usuario.lastName = document.getElementById("apellido").value;
        usuario.age = document.getElementById("edad").value;
        usuario.email = document.getElementById("email").value;
        usuario.phone = document.getElementById("telefono").value;
        usuario.photo = document.getElementById("profilePhoto").src;
        if(localStorage.getItem('usuario') !== null){
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }else{
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
        }
        getProfileView(usuario);
        setPhoto();
    });
}

function getProfileView(obj){
    let html = `
        <img src="https://thispersondoesnotexist.com/image" id="profilePhoto" alt="" style="border-radius: 100%; width: 200px; height:200px; object-fit:cover;">
        <div class="d-inline-flex flex-column justify-content-between text-center h-50 my-4">
          <i class="fa fa-user-circle" aria-hidden="true"></i>${obj.firstName} ${obj.lastName} 
          <i class="fas fa-mail-bulk"></i>${obj.email}
          <i class="fa fa-birthday-cake" aria-hidden="true"></i>${obj.age} años
          <i class="fa fa-phone" aria-hidden="true"></i>${obj.phone}
        </div>
    `;
    document.getElementById("profile").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function (e) {
    setProfileData();
    getProfileView(usuario);
});