import {
  cart,
  removeFromcart,
  calculateUpdateCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProducts = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    let dateString = "";
    if (deliveryOption) {
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      dateString = deliveryDate.format("dddd, MMMM D");
    }

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price">
            $${(matchingProducts.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              //We use "data-product-id" to catch the loop items
              matchingProducts.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProducts, cartItem)}
          
        </div>
      </div>
    </div>
  `;
  });

  function deliveryOptionsHTML(matchingProducts, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const price =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${
        matchingProducts.id
      }" data-delivery-option-id="${deliveryOption.id}"
      >
            <input type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchingProducts.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${price} - Shipping
              </div>
            </div>
          </div>
      `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromcart(productId);

      const container = document.querySelector(
        `.js-cart-container-${productId}`
      ); //matchingProdcuts.id = productId
      container.remove();
      updateCartQuantity(); //we set the UpdateCartQunaitiy to delect link because we want the updateCartQuantity follow the quantity of delect link

      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateUpdateCart();
    document.querySelector(
      ".js-checkout-quantity"
    ).innerHTML = `${cartQuantity} Items`;
  }

  updateCartQuantity();

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //use this function to rerun everything to reload new page
      renderPaymentSummary();
    });
  });
}
