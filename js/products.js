let products = [];

let showProducts = (array)=>{
    let productList = `<a href="product-info.html" style="text-decoration:none; color:black;">
    <div class="card-group">
    <div class="row" style="width:100%">`;
    for(let product of array){
        productList += `
            <div class="col-md-4 d-flex justify-content-center">
                <div class="card m-2 w-100">
                <img src="${product.imgSrc}" alt="${product.description}" class="card-img-top">
                <div class="card-body d-inline-flex flex-column justify-content-between">
                    <h4>${product.name}</h4>
                    <p>${product.soldCount} artículos</p>
                    <p>${product.description}</p>
                    <span>${product.currency} ${product.cost}</span>
                </div>
                </div>
            </div>`
    }
    productList += `</div>
    </div>
    </a>`;
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
