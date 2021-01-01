import {Product} from "../../backend/model/product.ts";
import {getShoppingCart, addToShoppingCart, removeFromShoppingCart} from "./ShoppingCart.ts";

export async function loadShoppingCart() {
    let cart: [Product, number][] = [];
    await getShoppingCart().then(response => {
        cart = response;
    });

    const table = document.getElementById("tb-products");
    table.innerHTML = "";

    let total = 0;
    cart.forEach(product => {
        const totalPerItem = product[0].specialOffer != undefined ? Math.round(product[0].specialOffer * product[1] * 100) / 100 : Math.round(product[0].normalPrice * product[1] * 100) / 100;
        total += totalPerItem;
        total = Math.round(total * 100) / 100;
        const pricePerItem = product[0].specialOffer != undefined ? product[0].specialOffer : product[0].normalPrice;

        table.innerHTML += `
                            <tr>
                                <td>${product[0].productName}</td>
                                <td>${pricePerItem}</td>
                                <td>
                                    <button class="btn btn-light" id="btn-removeProduct" value="${product[0].id}">-</button>
                                    <label>${product[1]}</label>
                                    <button class="btn btn-light" id="btn-addProduct" value="${product[0].id}">+</button>
                                </td>
                                <td style="width: 20%!important;">${totalPerItem} CHF</td>
                            </tr>`
    });

    table.innerHTML += `
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style="width: 10%!important;"><b>${total} CHF</b></td>
                        </tr>`;

    let removeProductButtons = document.querySelectorAll('#btn-removeProduct');
    removeProductButtons.forEach(button => {
       button.addEventListener('click', removeProduct);
    });

    let addProductButtons = document.querySelectorAll('#btn-addProduct');
    addProductButtons.forEach(button => {
        button.addEventListener('click', addProduct);
    });
}

async function removeProduct(clickEvent: MouseEvent){
    await removeFromShoppingCart(clickEvent.composedPath()[0].value);
    await loadShoppingCart();
}

async function addProduct(clickEvent: MouseEvent){
    await addToShoppingCart(clickEvent.composedPath()[0].value);
    await loadShoppingCart();
}