import {addToShoppingCart} from "./ShoppingCart.ts";

document.getElementById("btn-addToCart").addEventListener("click", () => addToShoppingCart(new URLSearchParams(window.location.search).get("productId")));