import {Product} from "../../backend/model/product.ts";

export async function loadAllProducts() {
    const response = await fetch("http://localhost:8000/api/products");
    const products: Product[] = await response.json();

    const listProducts = document.getElementById("list-products");

    const countRows = Math.ceil(products.length / 4);
    for (let rowCount = 1; rowCount <= countRows; rowCount++) {
        listProducts.innerHTML += `<div class="row" id="Row${rowCount}"></div>`;
    }

    let rowCount = 0;
    let columnCount = 1;
    for (const product of products) {
        if(columnCount == 1)
            rowCount++;

        const row = document.getElementById("Row" + rowCount);
        console.log(row);

        row.innerHTML += ` <a class="col" href="./views/ProductDetail.html?productId=${product.id}">
                                        <div class="card" style="width: 20rem;">
                                            <img src="./assets/${product.imageName}" class="card-img-top" alt="test">
                                            <div class="card-body">
                                                <h5 class="card-title">${product.productName}</h5>
                                                <span class="card-text">${product.specialOffer}</span>
                                                <span class="card-text normal-price">${product.normalPrice}</span>
                                            </div>
                                        </div>
                                    </a>`;
        columnCount++;
        if(columnCount > 4)
            columnCount = 1;
    }
}

