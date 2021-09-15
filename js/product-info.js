let product = {};
let comments = [];

let showProductInfo = (product)=>{

  function showImgs(imgArray){
    let arrayImg = "";
    imgArray.forEach(img=>{
      arrayImg += `<div class="col-sm-7 m-2"><img src="${img}" class="rounded img-fluid"></div>`
    });
    return arrayImg;
  }

let productList = `<div class="list-group-item">
        <div class="row">
            <div class="col-sm-4">
        <img src="${product.images[0]}" alt="${product.description}" class="img-fluid rounded" >
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
  <div class="col-sm-4 d-inline-flex ">
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

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_URL).then(response=>{
      if(response.status === 'ok'){
        product = response.data;
        showProductInfo(product);
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
    let username = document.getElementById('username').innerHTML;
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
