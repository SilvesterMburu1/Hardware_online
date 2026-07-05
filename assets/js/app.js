document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("productForm");
    const salesForm = document.getElementById("salesForm");
    const searchInput = document.getElementById("searchInput");

    updateDashboard();
    displayProducts();
    displaySales();
    loadProductsIntoSelect();

    searchInput.addEventListener("input", displayProducts);

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const stock = document.getElementById("productStock").value;

        addProduct(name, price, stock);

        loadProductsIntoSelect();
        form.reset();
        displayProducts();
        updateDashboard();

    });

    salesForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const productId = document.getElementById("saleProduct").value;
        const quantity = document.getElementById("saleQuantity").value;

        recordSale(productId, quantity);

      displaySales();

        salesForm.reset();
        displayProducts();
        updateDashboard();
        loadProductsIntoSelect();

    });

});

function updateDashboard() {

    const products = StorageManager.getProducts();
    const sales = StorageManager.getSales();

    document.getElementById("productCount").textContent = products.length;
    document.getElementById("salesCount").textContent = sales.length;

    // Total Revenue
    const revenue = sales.reduce((total, sale) => {
        return total + sale.total;
    }, 0);

    document.getElementById("revenue").textContent = revenue;

    // Low Stock Products
    const lowStock = products.filter(product => product.stock < 5);

    document.getElementById("lowStock").textContent = lowStock.length;
}

function displaySales() {

    const tbody = document.querySelector("#salesTable tbody");

    tbody.innerHTML = "";

    const sales = StorageManager.getSales();

    sales.forEach(sale => {

        tbody.innerHTML += `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>KSh ${sale.total}</td>
                <td>${sale.date}</td>
            </tr>
        `;

    });

}

function displayProducts() {
    const tbody = document.querySelector("#productTable tbody");

    tbody.innerHTML = "";
  
  const search = document
  .getElementById("searchInput")
  .value
  .toLowerCase();

    const products = StorageManager.getProducts();
  
  const filteredProducts = products.filter (product=>
  product.name.toLowerCase().includes(search)
  );

    filteredProducts.forEach(product => {

        tbody.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>KSh ${product.price}</td>

            <td>${product.stock}</td>

            <td>
            
            
    <div class="action-buttons">
        <button class="edit-btn" onclick="editProduct(${product.id})"> 
            Edit
        </button>

        <button onclick="deleteProduct(${product.id})">
            Delete
        </button>
    </div>
</td>

        </tr>

        `;

    });

}