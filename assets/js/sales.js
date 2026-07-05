function loadProductsIntoSelect() {

    const select = document.getElementById("saleProduct");

    const products = StorageManager.getProducts();

    select.innerHTML = `
        <option value="">Select Product</option>
    `;

    products.forEach(product => {

        select.innerHTML += `
            <option value="${product.id}">
                ${product.name}
            </option>
        `;

    });

}