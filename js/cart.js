const amount = document.getElementsByClassName("amount-item");

//Cambio de monto
function amountHandle() {
  for (let item of amount) {
    item.addEventListener("change", (event) => {
      if (document.getElementById("setCurrency").value !== "") {
        event.target.parentElement.parentElement.children[4].children[1].innerHTML =
          event.target.parentElement.parentElement.children[2].children[1]
            .innerHTML * event.target.value;
        productTotal(
          event.target.parentElement.parentElement.children[2].children[0]
            .innerHTML
        );
      } else {
        alert("Seleccione una divisa");
        event.target.value = event.target.defaultValue;
        return;
      }
    });
  }
}

//Configura la moneda en la que se va a trabajar
function setCurrency(objCart) {
  const currencyArray = Array.from(document.getElementsByClassName("currency"));
  const costArray = document.getElementsByClassName("cost");
  const currencySetter = document.getElementById("setCurrency");
  const subtotalValue = document.getElementsByClassName("subtotal");
  for (let i = 0; i < objCart.articles.length; i++) {
    const obj = objCart.articles[i];
    let cost = 0;
    currencySetter.addEventListener("change", (event) => {
      switch (event.target.value) {
        case "USD":
          if (obj.currency != "USD") {
            cost = obj.unitCost / 40;
            costArray[i].innerHTML = cost;
            currencyArray.forEach((elem) => {
              elem.innerHTML = "USD";
            });
            subtotalValue[i].innerHTML = amount[i].value * cost;
          } else {
            cost = obj.unitCost;
            costArray[i].innerHTML = cost;
            subtotalValue[i].innerHTML = amount[i].value * cost;
          }
          productTotal("USD");
          break;
        case "UYU":
          if (obj.currency != "UYU") {
            cost = obj.unitCost * 40;
            costArray[i].innerHTML = cost;
            subtotalValue[i].innerHTML = amount[i].value * cost;
            currencyArray.forEach((elem) => {
              elem.innerHTML = "UYU ";
            });
          } else {
            cost = obj.unitCost;
            costArray[i].innerHTML = cost;
            subtotalValue[i].innerHTML = amount[i].value * cost;
          }
          productTotal("UYU");
          break;
      }
    });
  }
}

function shipping(currency) {
  let shippingCost = 0;
  const shippingView = document.getElementById("totalShipping");
  const shipping = document.getElementsByName("shippingRadio");
  const subTotal = parseFloat(document.getElementById("totalNumber").innerHTML);
  shipping.forEach((elem) =>{
    if(elem.checked){
      shippingCost = parseFloat(elem.value) * subTotal;
    }
  });
  shippingView.innerHTML = `<span class="currency">Total de envío: ${currency}<span id="totalNumber"> ${(shippingCost).toFixed(2)}</span></span>`
  return shippingCost;
}

function handlerShipping(currency){
  const shippingHTML = document.getElementsByName("shippingRadio");
  shippingHTML.forEach(elem=>{
    elem.addEventListener("change", ()=>{
      shipping(currency);
      total(currency);
    });
  })

}

//Total de producto + envío
function total(currency) {
  let totalValue = document.getElementById("totalAll");
  let totalProduct = parseFloat(
    document.getElementById("totalNumber").innerHTML
  );
  totalValue.innerHTML = `${currency} ${shipping(currency) + totalProduct}`;
}

//Muestra total del producto
function productTotal(currency) {
  const subtotal = Array.from(document.getElementsByClassName("subtotal"));
  const totalReduce = subtotal.reduce((a, b) => a + parseFloat(b.innerHTML), 0);
  let html = `<span class="currency">Total de producto: ${currency}<span id="totalNumber"> ${totalReduce}</span></span>`;
  document.getElementById("totalProduct").innerHTML = html;
  deleteFromCart(currency);
  handlerShipping(currency);
  total(currency);
}

//Vista del carro
function productCartView(objCart) {
  let html = "";
  for (let obj of objCart.articles) {
    html += `<tr class="justify-content-center">
        <td scope="row"><img src="${
          obj.src
        }" class="rounded" style="width:100px"></td>
        <td>${obj.name}</td>
        <td><span class="currency">${obj.currency}</span> <span class="cost">${
      obj.unitCost
    }</span></td>
        <td><input type="number"
        min=1 style="width:70px" class="form-control amount-item" name="" id="" value="${
          obj.count
        }"></td>
        <td><span class="currency">${
          obj.currency
        } </span><span class="subtotal">${obj.unitCost * obj.count}</span></td>
        <td><button class="btn btn-danger dismiss" onclick="event.target.parentElement.parentElement.remove()">Eliminar</button></td>
        </tr>`;
  }
  document.getElementsByTagName("tbody")[0].innerHTML = html;
}

function deleteFromCart(currency) {
  const btnArray = document.getElementsByClassName("dismiss");
  for (let btn of btnArray) {
    btn.addEventListener("click", (event) => {
      event.target.parentElement.parentElement.remove();
      productTotal(currency);
      total(currency);
    });
  }
}

function validatePayMethod() {
  document.getElementById("saveMethod").addEventListener("click", () => {
    const inputForm = document.querySelector("#credit-form");
    const inputArray = Array.from(inputForm.querySelectorAll("input"));
    if (inputArray.every((elem) => elem.value.trim() != "")) {
      document.getElementById("saveMethod").dataset.dismiss = "modal";
    } else {
      document.getElementById("saveMethod").dataset.dismiss = "";
    }
  });
}

//Método de pago
function payMethod() {
  let selectPayMethod = document.getElementById("payMethod");
  let modalForm = document.getElementsByClassName("modal-form");
  selectPayMethod.addEventListener("change", () => {
    if (selectPayMethod.value === "Selecciona un metodo de pago") {
      modalForm[0].innerHTML = "";
    } else if (selectPayMethod.value === "Tarjeta de credito") {
      modalForm[0].innerHTML = `<form id="credit-form" class="was-validated">
      <label for="number">Numero de tarjeta</label>
      <input class="form-control" type="text" name="number" required>
      <div class="valid-feedback">
      Looks good!
      </div>
      <label for="first-name">Nombre</label>
      <input class="form-control" type="text" name="first-name" required />
      <div class="invalid-feedback">
      Por favor, ingrese un nombre.
      </div>
      <label for="last-name">Apellido</label>
      <input class="form-control" type="text" name="last-name" required />
      <div class="invalid-feedback">
      Por favor, ingrese un apellido.
      </div>
      <div class="form-group d-flex justify-content-around mt-3">
      <label for="expiry">Vencimiento
      <input class="form-control w-75" type="text" name="expiry" required />
      <div class="invalid-feedback">
      Por favor, ingrese el vencimiento.
      </div>
      </label>
      <label for="cvc">CVC
      <input class="form-control w-75" type="text" name="cvc" required />
      <div class="invalid-feedback">
      Por favor, ingrese el codigo verificador.
      </div></label>
      </div>
      <button class="btn btn-success my-4" id="saveMethod">Guardar</button>
      </form>`;
      let card = new Card({
        form: "#credit-form",
        container: ".modal-form",
        formSelectors: {
          nameInput: 'input[name="first-name"], input[name="last-name"]',
        },
      });
      validatePayMethod();
    } else {
      modalForm[0].innerHTML = `<form id="credit-form" class="was-validated">
      <label for="number">Numero de cuenta</label>
      <input class="form-control" type="text" name="number" pattern="[a-zA-Z]{2}[0-9]{20}$" required />
      <div class="invalid-feedback">
      Por favor, ingrese los caracteres representantes de su entidad y su número de cuenta.
      </div>
      <button class="btn btn-success my-4" id="saveMethod">Guardar</button>
      </form>`;
      validatePayMethod();
    }
  });
}

//Fetch y llamados a funciones
document.addEventListener("DOMContentLoaded", function () {
  let result = {};
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(
    (res) => {
      if (res.status === "ok") {
        result = res.data;
        productCartView(result);
        amountHandle();
        setCurrency(result);
        payMethod();
      }
    }
  );
});
