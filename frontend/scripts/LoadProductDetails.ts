import { Product } from "../../backend/model/product.ts";

export async function loadProductDetail() {
    const productId = new URLSearchParams(window.location.search).get("productId");
    const response = await fetch(`/api/persons/${productId}`);
    const product: Product = await response.json();

    document.querySelector("h1").innerText = `${product.productName} ${product.description}`;
    document.querySelector("span").innerText = product.id;
}