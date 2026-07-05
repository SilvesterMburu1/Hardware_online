document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("productForm");

    updateDashboard();

    displayProducts();
  
    loadProductsIntoSelect();
  
  const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", displayProducts);

    form.addEventListener("submit", function (e) {

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