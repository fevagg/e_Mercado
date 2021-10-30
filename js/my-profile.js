let usuario = JSON.parse(localStorage.getItem('usuario')) != null ? JSON.parse(localStorage.getItem('usuario')) : JSON.parse(sessionStorage.getItem('usuario'));

function setPhoto(user){
    let input = document.querySelector('input[type=file]');
    let reader = new FileReader();

    if (input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    } else {
        user.photo = "./img/user-icon.png";
    }

    reader.onloadend = () =>{
        user.photo = reader.result;
    }
}

function setProfileData(){
    if(usuario !== null){
        setProfileView(usuario);
    }
    document.getElementById("btn").addEventListener('click', (e)=>{
        usuario.firstName = document.getElementById("nombre").value;
        usuario.lastName = document.getElementById("apellido").value;
        usuario.age = document.getElementById("edad").value;
        usuario.email = document.getElementById("email").value;
        usuario.phone = document.getElementById("telefono").value;
        setPhoto(usuario);
        if(localStorage.getItem('usuario') !== null){
            localStorage.setItem('usuario', JSON.stringify(usuario));
            setProfileView(usuario);
        }else{
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            setProfileView(usuario);
        }
     });
}

function setProfileView(obj){
    let html = `
        <img src="${obj.photo || "./img/user-icon.png"}" id="profilePhoto" alt="" style="border-radius: 100%; width: 200px; height:200px; object-fit:cover;">     
        <div class="d-inline-flex flex-column justify-content-between text-center h-50 my-4">
          <i class="fa fa-user-circle" aria-hidden="true"></i>${obj.firstName || ""} ${obj.lastName ||""} 
          <i class="fas fa-mail-bulk"></i>${obj.email || ""}
          <i class="fa fa-birthday-cake" aria-hidden="true"></i>${obj.age || ""} años
          <i class="fa fa-phone" aria-hidden="true"></i>${obj.phone || ""}
        </div>
    `;
    document.getElementById("profile").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function (e) {
    setProfileData();
});