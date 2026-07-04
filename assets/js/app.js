document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("productForm");

    updateDashboard();

    displayProducts();

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("productName").value;

        const price = document.getElementById("productPrice").value;

        const stock = document.getElementById("productStock").value;

        addProduct(name, price, stock);

        form.reset();

        displayProducts();

        updateDashboard();

    });

});

function updateDashboard() {

    const products = StorageManager.getProducts();

    const sales = StorageManager.getSales();

    document.getElementById("productCount").textContent = products.length;

    document.getElementById("salesCount").textContent = sales.length;

}

function displayProducts() {

    const tbody = document.querySelector("#productTable tbody");

    tbody.innerHTML = "";

    const products = StorageManager.getProducts();

    products.forEach(product => {

        tbody.innerHTML += `

            <tr>

                <td>${product.name}</td>

                <td>KSh ${product.price}</td>

                <td>${product.stock}</td>

            </tr>

        `;

    });

}