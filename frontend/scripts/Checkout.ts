import {checkoutValidation} from "./ShoppingCart.ts";

async function checkout(event: any) {
    event.preventDefault();

    const firstname = document.getElementById("input-firstname").value;
    const lastname = document.getElementById("input-lastname").value;
    const email = document.getElementById("input-email").value;
    const user: { firstname: string, lastname: string, email: string } = {firstname, lastname, email};

    const validationMessage = await checkoutValidation(user);

    if(validationMessage != "")
        alert(validationMessage);
    else{
        alert("Your purchase was successful");
        window.location.href = "http://localhost:8000/";
    }
}

document.getElementById("form-checkout").addEventListener("submit", checkout);