//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let products = [];

let showProducts = (array)=>{
    let productList = "";
    for(let product of array){
        productList += `<a href="product-info.HTML" style="text-decoration:none; color:black;">
        <div class="list-group-item">
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
</div>
</a>`
    }
    document.getElementById('product-list').innerHTML = productList;
}

function orderProductByRelevance(){
    products.sort((a,b)=>{
        return b.soldCount - a.soldCount;
    });
    showProducts(products);
}

function orderProductByHighestPrice(){
    products.sort((a,b)=>{
        return b.cost - a.cost;
    });
    showProducts(products);
}

function orderProductByLowestPrice(){
    products.sort((a,b)=>{
        return a.cost - b.cost;
    });
    showProducts(products);
}

function filteredByPrice(){
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    const productsFiltered = products.filter(product => product.cost >= min.value && product.cost <= max.value);
    if(min.value !== '' && max.value !== '') showProducts(productsFiltered); else showProducts(products);
}

function search(){
    let search = document.getElementById('search');
    let productSearched = products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()));
    showProducts(productSearched);
}



document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCTS_URL).then(response=>{
            if(response.status === 'ok'){
              products = response.data;
              showProducts(products);
            }
        });
});
