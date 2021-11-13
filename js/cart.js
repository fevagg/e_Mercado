const amount = document.getElementsByClassName("amount-item");

//Cambio de monto
function amountHandle() {
  for (let item of amount) {
    item.addEventListener("change", (event) => {
      if (
        document.getElementById("setCurrency").value !== "Selecciona una divisa"
      ) {
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
        default:
          document.getElementById("totalProduct").innerHTML = "";
      }
    });
  }
}

function shipping(currency) {
  const shipping = document.getElementsByName("shippingRadio");
  const subTotal = parseFloat(document.getElementById("totalNumber").innerHTML);
  let totalShipping = document.getElementById("totalShipping");
  shipping.forEach((elem) =>
    elem.addEventListener("click", (event) => {
      switch (event.target.value) {
        case "premium":
          totalShipping.innerHTML = `<span class="currency">Total de envio: ${currency}<span id="totalShippingNumber"> ${
            (subTotal * 15) / 100
          }</span></span>`;

          total(currency);
          break;
        case "express":
          totalShipping.innerHTML = `<span class="currency">Total de envio: ${currency}<span id="totalShippingNumber"> ${
            (subTotal * 7) / 100
          }</span></span>`;

          total(currency);
          break;
        case "standard":
          totalShipping.innerHTML = `<span class="currency">Total de envio: ${currency}<span id="totalShippingNumber"> ${
            (subTotal * 5) / 100
          }</span></span>`;
          total(currency);
          break;
      }
    })
  );
}

function total(currency) {
  let totalValue = document.getElementById("totalAll");
  let totalShipping = parseFloat(
    document.getElementById("totalShippingNumber").innerHTML
  );
  let totalProduct = parseFloat(
    document.getElementById("totalNumber").innerHTML
  );
  totalValue.innerHTML = `${currency} ${totalShipping + totalProduct}`;
}

//Muestra total del producto
function productTotal(currency) {
  const subtotal = Array.from(document.getElementsByClassName("subtotal"));
  const totalReduce = subtotal.reduce((a, b) => a + parseFloat(b.innerHTML), 0);
  let html = `<span class="currency">Total de producto: ${currency}<span id="totalNumber"> ${totalReduce}</span></span>`;
  document.getElementById("totalProduct").innerHTML = html;
  shipping(currency);
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
        </tr>`;
  }
  document.getElementsByTagName("tbody")[0].innerHTML = html;
}

function payMethod() {
  let modal = document.getElementById("payMethodModal");
  let selectPayMethod = document.getElementById("payMethod");
  let modalForm = document.getElementsByClassName("modal-form");
  const savePayMethod = document.getElementById('savePayMethod');
  selectPayMethod.addEventListener("change", () => {
    if (selectPayMethod.value === "Selecciona un metodo de pago") {
      modalForm[0].innerHTML = "";
    } else if (selectPayMethod.value === "Tarjeta de credito") {
      function prevent(event){
          event.preventDefault()
        }
      modalForm[0].innerHTML = `<form class="needs-validation">
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
      <button type="submit" class="btn btn-success"> Guardar </button>
      </form>`;
      let card = new Card({
        form: "form",
        container: ".modal-form",
        formSelectors: {
          nameInput: 'input[name="first-name"], input[name="last-name"]',
        },
      });
    } else {
      modalForm[0].innerHTML = `<form>
      <label for="number">Numero de cuenta</label>
      <input class="form-control" type="text" name="number" pattern="/^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/">
      </form>`;
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
