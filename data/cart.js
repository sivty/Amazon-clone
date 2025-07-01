export const cart = [];

export function addTocart(productId) {
  const quantitySelect = document.querySelector(
    `.js-quantity-selector-${productId}` //DOM can't use product.id so we use productId
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
