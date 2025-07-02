import { products } from "../data/products.js";

export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addTocart(productId) {
  const quantitySelect = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelect.value); //this how to convert string to Number

  let matchingItem;

  cart.forEach((cartItems) => {
    if (productId === cartItems.productId) {
      matchingItem = cartItems;
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
}
