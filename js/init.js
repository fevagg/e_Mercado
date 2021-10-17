const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if(localStorage.getItem('usuario') != undefined){
    var user = JSON.parse(localStorage.getItem('usuario'))
    const navDrop = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    <i class="fa fa-user-circle" aria-hidden="true"></i> ${user.nombre}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
      <a class="dropdown-item" href="./cart.html">Mi carrito</a>
      <a class="dropdown-item" href="./my-profile.html"><i class="fas fa-user"></i> Mi perfil</a>
      <a class="dropdown-item" id="disconnect" href="">Desconectar</a>
    </div>
    </div>`
    document.getElementsByTagName('nav')[0].firstElementChild.innerHTML += navDrop;
    document.getElementById('welcome').innerHTML += user.nombre;
    document.getElementById('disconnect').addEventListener('click', ()=>{
      signOut();
    })

  }else{
    var user = JSON.parse(sessionStorage.getItem('usuario'))
    const navDrop = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    <i class="fa fa-user-circle" aria-hidden="true"></i> ${user.nombre}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
      <a class="dropdown-item" href="./cart.html">Mi carrito</a>
      <a class="dropdown-item" href="./my-profile.html">Mi perfil</a>
      <a class="dropdown-item" id="disconnect" href="./index.html">Desconectar</a>
    </div>
    </div>`
    document.getElementsByTagName('nav')[0].firstElementChild.innerHTML += navDrop;
    document.getElementById('welcome').innerHTML += user.nombre;
    document.getElementById('disconnect').addEventListener('click', ()=>{
      signOut();
    })
  }
});