//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
import {getJSONData, PRODUCTS_URL} from './init.js'

let products = [];

let showProducts = (array)=>{
    let productList = "";
    for(let product of array){
        productList += `<div class="list-group-item">
        <div class="row">
            <div class="col-sm-4">
        <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
    </div>
    <div class="col-sm-8">
        <div class="d-flex w-100 justify-content-between">
            <h4>${product.name}</h4>
            <p>${product.soldCount} artículos</p>
        </div>
        <p>${product.description}</p>
        <span>${product.currency} ${product.cost}</span>
    </div>
</div>
</div>`
    }
    document.getElementById('product-list').innerHTML += productList;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(response=>{
        if(response.status === 'ok'){
          products = response.data;
          console.log(products)
          showProducts(products);
        }
      })
});