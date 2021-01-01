import {checkoutValidation} from "./ShoppingCart.ts";

async function checkout(event: any) {
    event.preventDefault();
    const response = await checkoutValidation();
    console.log(await response);

    //TODO window.location.href = "http://localhost:8000/";
    //TODO window.location.replace = "http://localhost:8000/";
}

document.getElementById("form-checkout").addEventListener("submit", checkout);