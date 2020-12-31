const api = "http://localhost:8000/api";

async function loadShoppingCart(){
    const productId = new URLSearchParams(window.location.search).get("productId");
    const response = await fetch(`/api/cart?${productId}`);
    const shoppingCart = response.json();
}

export async function updateShoppingCart(){
    const response = await fetch(`${api}/cart/cost`);
    const cartCost : number = await response.json();

    document.getElementById("label-price").innerHTML = cartCost;
}

async function addToShoppingCart() {
    const productId = new URLSearchParams(window.location.search).get("productId");

    const response = await fetch(`${api}/cart/update`, {
        method: 'POST',
        mode: `no-cors`,
        body: JSON.stringify(productId)
    });

    await updateShoppingCart();
}

document.getElementById("btn-addToCart").addEventListener("click", addToShoppingCart);