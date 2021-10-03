let productSelected = {};
let productsArray = [];
let comments = [];

let showProductInfo = (product)=>{

  function carrouselImg(imgArray){
    let carrousel = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;
    imgArray.forEach(img=>{
      if(img == imgArray[0]){
        carrousel += `<div class="carousel-item active">
        <img src="${img}" class="d-block w-100" alt="...">
        </div>`
      }else{
        carrousel += `<div class="carousel-item">
        <img src="${img}" class="d-block w-100" alt="...">
        </div>`
      }
    });
    carrousel += `</div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    </div>`;
    return carrousel;
  }

  function showImgs(imgArray){
    let arrayImg = "";
    imgArray.forEach(img=>{
      arrayImg += `<div class="col-sm-3 flex-row mt-4"><img src="${img}" class="rounded img-fluid"></div>`
    });
    return arrayImg;
  }

  let productList = `<div class="list-group-item">
        <div class="row">
            <div class="col-sm-4">
            ${carrouselImg(product.images)}
    </div>
    <div class="col-sm-8">
        <div class="d-inline-flex w-100 justify-content-between">
            <h4>${product.name}</h4>
            <p>${product.soldCount} artículos</p>
        </div>
        <p>${product.description}</p>
        <span><strong>${product.currency} ${product.cost}</strong></span>
    </div>
  </div>
  <div class="col-auto my-4">
    <h5><b>Imágenes ilustrativas</b></h5>
  </div>
  <div class="row">
    ${showImgs(product.images)}
  </div>
</div>`

  document.getElementById('product-list').innerHTML = productList;

}

let showComment = (commentArray)=>{
  let commentList = '';
  for(let comment of commentArray){
        commentList += `<div class="list-group-item">
        <div class="row flex-row">
          <div class="col-sm-12">
              <div class="d-flex w-100 justify-content-between">
                <h4>${comment.user}</h4>
                <p>${comment.dateTime}</p>
              </div>
              <div class="d-flex justify-content-between">
                <i>"${comment.description}"</i>
                <span id="score" class="d-inline-flex">${rating(comment.score)}</span>
              </div>
        </div>
    </div>
    </div>`
  }
  document.getElementById('comment-list').innerHTML = commentList;
}

let userRatingProduct = ()=>{
  var currentlyUserRate = document.getElementsByName('rating');
  for(let rate of currentlyUserRate){
    if(rate.checked){
      return rate.value;
    }
  }
}

function rating(score){
  let stars = "";
  for (let i=1; i<=score; i++){
    stars += '<i class="fas fa-star"></i>';
  }
  return stars
}

let showRelatedProducts = (array)=>{
  let productList = '';
  for(let i = 0; i < productSelected.relatedProducts.length; i++){
    const relatedProduct = array[productSelected.relatedProducts[i]];
      productList += `<div class="card m-3" style="width: 18rem;">
      <img src="${relatedProduct.imgSrc}" class="card-img-top" alt="${relatedProduct.description}">
      <div class="card-body d-inline-flex flex-column justify-content-between">
        <h5 class="card-title">${relatedProduct.name}</h5>
        <p class="card-text">${relatedProduct.description}</p>
        <p class="card-text"><small>${relatedProduct.soldCount} artículos vendidos</small></p>
      </div>
    </div>`
  }
  document.getElementById('related-products').innerHTML = productList;
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_URL).then(response=>{
      if(response.status === 'ok'){
        productSelected = response.data;
        showProductInfo(productSelected);
        getJSONData(PRODUCTS_URL).then(response=>{
          if(response.status === 'ok'){
            productsArray = response.data;
            showRelatedProducts(productsArray);
          }
        });
      }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(response=>{
      if(response.status === 'ok'){
        comments = response.data;
        showComment(comments);
      }
  });
  document.getElementById('btn_rate').addEventListener('click', ()=>{
    let userOpinion = {}
    if(localStorage.getItem('usuario') != undefined){
      var user = JSON.parse(localStorage.getItem('usuario'))
    }else{
      var user = JSON.parse(sessionStorage.getItem('usuario'))
    }
    let username = user.nombre;
    let userDescription = document.getElementById('user-comment').value;
    let date = new Date();
    let userCommentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    userOpinion.score = userRatingProduct();
    userOpinion.description = userDescription;
    userOpinion.user = username;
    userOpinion.dateTime = userCommentDate;
    comments.push(userOpinion);
    showComment(comments);
  });
});
