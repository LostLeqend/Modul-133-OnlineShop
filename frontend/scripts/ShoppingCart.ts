async function loadShoppingCart(){
    const productId = new URLSearchParams(window.location.search).get("productId");
    const response = await fetch(`/api/cart?${productId}`);
    const shoppingCart = response.json();
}

async function addToShoppingCart() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    console.log(productId);
    const response = await fetch('/api/cart/update', {
        method: 'POST',
        mode: `no-cors`,
        body: JSON.stringify(productId),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);
    await loadShoppingCart();
}

document.getElementById("btn-addToCart").addEventListener("click", addToShoppingCart);