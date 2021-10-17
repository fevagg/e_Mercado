const amount = document.getElementsByClassName('amount-item');


function amountHandle(){
    for(let item of amount){
        item.addEventListener('change', (event)=>{
            event.target.parentElement.parentElement.children[4].children[1].innerHTML = event.target.parentElement.parentElement.children[2].children[1].innerHTML * event.target.value;
            productTotal(event.target.parentElement.parentElement.children[2].children[0].innerHTML);
        });
    }
}

function setCurrency(objCart){
    const currencyArray = Array.from(document.getElementsByClassName('currency'));
    const costArray = document.getElementsByClassName('cost');
    const currencySetter = document.getElementById('setCurrency');
    const subtotalValue = document.getElementsByClassName('subtotal');
    for(let i = 0; i < objCart.articles.length; i++){
        const obj = objCart.articles[i];
        let cost = 0;
        currencySetter.addEventListener('change', (event)=>{
            switch(event.target.value){
                case 'USD':
                    if(obj.currency != 'USD'){
                        cost = obj.unitCost / 40;
                        costArray[i].innerHTML = cost;
                        currencyArray.forEach(elem=>{
                            elem.innerHTML = 'USD ';
                        });
                        subtotalValue[i].innerHTML = amount[i].value * cost; 
                    }else{
                        cost = obj.unitCost;
                        costArray[i].innerHTML = cost;
                        subtotalValue[i].innerHTML = amount[i].value * cost;
                    }
                    productTotal('USD');
                    break;
                case 'UYU':
                    if(obj.currency != 'UYU'){
                        cost = obj.unitCost * 40;
                        costArray[i].innerHTML = cost;
                        subtotalValue[i].innerHTML = amount[i].value * cost; 
                        currencyArray.forEach(elem=>{
                            elem.innerHTML = 'UYU ';
                        });
                    }else{
                        cost = obj.unitCost;
                        costArray[i].innerHTML = cost;
                        subtotalValue[i].innerHTML = amount[i].value * cost; 
                    }
                    productTotal('UYU');
                    break;
                default:
                    document.getElementById('totalProduct').innerHTML = '';
            }
        });
    }
}

function setPayMethod(){
    const payMethod = document.getElementById('pay-method');
    const payMethodSelect = document.getElementById('pay-method-setter');
    payMethodSelect.addEventListener('change', ()=>{
        if(payMethodSelect.children[1].selected){
            payMethod.innerHTML = `<div class="form-group" id="bank-transfer">
            <label for="">
            <input type="text" name="" id="" class="form-control" placeholder="Número de cuenta"></label>
          </div>`
        }else if(payMethodSelect.children[2].selected){
            payMethod.innerHTML = `<div class="form-group" id="credit-card">
            <label for="">
            <input type="text" pattern="[0-9]{13,16} " maxlength="16" name="" id="" class="form-control" placeholder="Número de la tarjeta"></label>
          </div>`
        }else{
            payMethod.innerHTML = '';
        }
    });
}

function productTotal(currency){
    const subtotal = Array.from(document.getElementsByClassName('subtotal'));
    const totalReduce = subtotal.reduce((a,b) => a + parseFloat(b.innerHTML), 0);
    let html = `<span class="currency">Total de producto: ${currency}<span id="totalNumber"> ${totalReduce}</span></span>`
    document.getElementById('totalProduct').innerHTML = html;
}

function showProductCart(objCart){
    let html = '';
    for(let obj of objCart.articles){
        html += `<tr class="justify-content-center">
        <td scope="row"><img src="${obj.src}" class="rounded" style="width:100px"></td>
        <td>${obj.name}</td>
        <td><span class="currency">${obj.currency}</span> <span class="cost">${obj.unitCost}</span></td>
        <td><input type="number"
        min=1 style="width:70px" class="form-control amount-item" name="" id="" value="${obj.count}"></td>
        <td><span class="currency">${obj.currency} </span><span class="subtotal">${obj.unitCost * obj.count}</span></td>
        </tr>`
    };
    document.getElementsByTagName('tbody')[0].innerHTML = html;
};

document.addEventListener("DOMContentLoaded", function(){
    let result = {};
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(res=>{
        if(res.status === 'ok'){
            result = res.data;
            showProductCart(result);
            amountHandle();
            setPayMethod();
            setCurrency(result);
        };
    });
});