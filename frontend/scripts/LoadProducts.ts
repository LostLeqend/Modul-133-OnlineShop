import {Product} from "../../backend/model/product.ts";

export async function loadAllProducts() {
    const response = await fetch("/api/products");
    const products: Product[] = await response.json();

    const list = document.getElementById("list-products");

    for (const product of products) {
        list.innerHTML += `<li>
                                <a href="./views/ProductDetail.html?productId=${product.id}">
                                ${product.productName} ${product.description} 
                            </li>`;
    }
}