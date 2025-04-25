const addToCartBtn = document.querySelector(".btn.btn-primary");
addToCartBtn.addEventListener("click", () => {
    const product = {
        name: document.getElementById("proudct-name").value,
        price: document.getElementById("proudct-price").value,
        size: document.querySelector("select").value,
        quantity: document.querySelector(".qauntiy").value,
        image: document.getElementById("MainImage").src,
        p_date: new Date().toLocaleString() 
    };

    if (!product.size) {
        alert("Please select a size");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
});