const productSection = document.getElementById("product-section");
const cartSection = document.querySelector(".cart-section");
const cartTable = document.getElementById("cart-table");
const subtotalCell = document.getElementById("subtotal-cell");
const subtotalRow = document.getElementById("subtotal-row");
const quantityDiscount = document.getElementById("discount-field");
const priceDiscount = document.getElementById("pricediscount-field");
const finalTotal = document.getElementById("finaltotal-field");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => displayProducts(data));

let cart = {};

function displayProducts(data) {
  data.forEach((product) => {
    const pCard = document.createElement("div");
    pCard.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;

    const pName = document.createElement("h4");
    pName.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `Price: ₹${product.price}`;

    const cartButton = document.createElement("button");
    cartButton.textContent = "Add to cart";

    cartButton.addEventListener("click", () => {
      addToCart(product);
    });

    pCard.appendChild(img);
    pCard.appendChild(pName);
    pCard.appendChild(price);
    pCard.appendChild(cartButton);
    productSection.appendChild(pCard);
  });
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity += 1;
    executeCart(cart[product.id], false);
  } else {
    cart[product.id] = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    executeCart(cart[product.id], true);
  }
}

function executeCart(productData, newRow) {
  const quantityCell = document.createElement("td");
  if (newRow) {
    const itemRow = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.textContent = productData.title;
    const priceCell = document.createElement("td");
    priceCell.textContent = productData.price;

    quantityCell.id = productData.id;
    quantityCell.textContent = productData.quantity;

    const totalCell = document.createElement("td");
    totalCell.textContent = (productData.price * productData.quantity).toFixed(
      2
    );

    itemRow.appendChild(titleCell);
    itemRow.appendChild(priceCell);
    itemRow.appendChild(quantityCell);
    itemRow.appendChild(totalCell);
    subtotalRow.parentNode.insertBefore(itemRow, subtotalRow);
  } else {
    document.getElementById(productData.id).innerHTML = productData.quantity;
  }
  calculateCart();
}

function calculateCart() {
  let sum = 0;
  let count = 0;
  let qDisct = 0;
  let pDisct = 0;
  let fTotal = 0;

  Object.values(cart).forEach((item) => {
    sum = sum + item.price * item.quantity;
    count += item.quantity;
  });
  subtotalCell.innerHTML = sum;

  if (count > 10) {
    qDisct = (sum * 0.1).toFixed(2);
  }

  if (sum > 500) {
    pDisct = (sum * 0.05).toFixed(2);
  }
  fTotal = (sum - qDisct - pDisct).toFixed(2);

  quantityDiscount.innerHTML = qDisct;
  priceDiscount.innerHTML = pDisct;
  finalTotal.innerHTML = fTotal;
}
