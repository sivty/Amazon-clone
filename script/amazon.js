import { cart, addTocart } from "../data/cart.js";
import { products } from "../data/products.js";
// because amazon.js in the scripte folder to make it get the file outside that folder need to use " .. "

let productsHTML = "";

products.forEach((product) => {
  //This is how to loop through array
  productsHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${
                product.rating.stars *
                10 /* Make it the same as image folder by using * 10 */
              }.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2 //.toFixed(2) is mean make the number after not have 2 number
          )}</div>

          <div class="product-quantity-container">
            <select class= "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>
          <button class="add-to-cart-button js-add-to-cart button-primary"
          data-product-id="${product.id}"  
          >Add to Cart</button>
        </div>
  `;
});

const productsGrid = document.querySelector(".js-products-grid");
if (productsGrid) {
  productsGrid.innerHTML = productsHTML;
}

function addMessagetobutton(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  if (timeOutId) {
    // check if it trusthy
    clearTimeout(timeOutId); // Use this to cancel the previous timeout
  }

  timeOutId = setTimeout(() => {
    //set the variable for setTimeout so we can cancel
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);
}

function updateCartQuantity() {
  // This how to add number to cartBag
  let cartQuantity = 0; //set it to 0 first

  cart.forEach((cartItems) => {
    cartQuantity += cartItems.quantity; //and than make it + 1
  });

  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

let timeOutId;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addTocart(productId);

    updateCartQuantity();

    addMessagetobutton(productId);
  });
});
