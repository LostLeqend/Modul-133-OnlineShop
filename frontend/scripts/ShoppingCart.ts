import {Product} from "../../backend/model/product.ts";

const api = "http://localhost:8000/api";

export async function getShoppingCart(): Promise<[Product, number][]> {
    const response = await fetch(`${api}/cart`);
    return await response.json();
}

export async function updateShoppingCart() {
    const response = await fetch(`${api}/cart/cost`);
    document.getElementById("label-price").innerHTML = await response.json();
}

export async function addToShoppingCart(productId) {
    await fetch(`${api}/cart/update`, {
        method: 'POST',
        mode: `no-cors`,
        body: JSON.stringify(productId)
    });

    await updateShoppingCart();
}

export async function removeFromShoppingCart(productId){
    await fetch(`${api}/cart/delete/` + productId, {
        method: 'DELETE',
    });

    await updateShoppingCart();
}