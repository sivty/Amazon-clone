import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem("cart")); //get the data from localstorage to the cart

if (!cart) {
  // this mean if cart is empty or null , cart will run default cart data
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); //Create the localstorage to save the data.
}

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

  saveToStorage(); // add to cart and store the data
}

export function removeFromcart(productId) {
  // function the add cartItem except the productId that we click on (This is how to remove the Item)
  const newCart = [];

  cart.forEach((cartItems) => {
    if (cartItems.productId !== productId) {
      newCart.push(cartItems);
    }
  });
  cart = newCart;
  saveToStorage(); // removeFromcart also have to store the data
}

export function calculateUpdateCart() {
  let cartQuantity = 0; //set it to 0 first

  cart.forEach((cartItems) => {
    cartQuantity += cartItems.quantity; //and than make it + 1
  });
  return cartQuantity;
}
