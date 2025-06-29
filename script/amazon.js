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

          <div class="added-to-cart ">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button js-added-cart button-primary"
          data-product-id="${product.id}"  
          >Add to Cart</button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-added-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    const quantitySelect = document.querySelector(
      `.js-quantity-selector-${productId}` //DOM can't use product.id so we use productId
    );

    const quantity = Number(quantitySelect.value); //this how to convert string to Number

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
      });
    }

    // This how to add number to cartBag
    let cartQuantity = 0; //set it to 0 first

    cart.forEach((item) => {
      cartQuantity += item.quantity; //and than make it + 1
    });

    document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  });
});
