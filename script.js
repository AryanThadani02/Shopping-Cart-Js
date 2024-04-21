const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

const productList = document.getElementById("productList");
const cart = document.getElementById("cart");
const totalPrice = document.getElementById("totalPrice");

// Render product list
Products.forEach((product) => {
  const li = document.createElement("li");
  li.style.margin= "30px"
  li.innerHTML = `
  <span>${product.name} - $${product.price}</span>
  <button onclick="addToCart(${product.id})">+</button>
`;
  productList.appendChild(li);
});

// Add product to cart
let cartItems = [];
function addToCart(productId) {
  const productToAdd = Products.find(
    (product) => product.id === productId
  );
  const existingCartItem = cartItems.find(
    (item) => item.id === productId
  );

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({
      id: productId,
      name: productToAdd.name,
      price: productToAdd.price,
      quantity: 1,
    });
  }

  renderCart();
}

// Remove product from cart
function removeFromCart(productId) {
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index !== -1) {
    const item = cartItems[index];
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cartItems.splice(index, 1);
    }
  }

  renderCart();
}

// Render cart
function renderCart() {
  cart.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cart.innerHTML = "<li>No Product added to the cart</li>";
  } else {
    cartItems.forEach((item) => {
      const li = document.createElement("li");
  li.style.margin= "30px"

      li.innerHTML = `
      <span>${item.name} - $${item.price} - Quantity: ${item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">-</button>
    `;
      cart.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  totalPrice.textContent = total;
}