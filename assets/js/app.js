document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const salesForm = document.getElementById("salesForm");
  const searchInput = document.getElementById("searchInput");

  updateDashboard();
  displayProducts();
  displaySales();
  document
    .getElementById("filterReport")
    .addEventListener("click", filterSales);

  document.getElementById("clearFilter").addEventListener("click", () => {
    document.getElementById("reportDate").value = "";

    displaySales();
  });
  loadProductsIntoSelect();

  searchInput.addEventListener("input", displayProducts);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const cost = document.getElementById("productCost").value;
    const price = document.getElementById("productPrice").value;
    const stock = document.getElementById("productStock").value;

    addProduct(name, cost, price, stock);
    loadProductsIntoSelect();
    form.reset();
    displayProducts();
    updateDashboard();
  });

  salesForm.addEventListener("submit", function (e) {
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
  const revenue = sales.reduce((total, sale) => total + sale.total, 0);
  document.getElementById("revenue").textContent = revenue;

  // Low Stock Products
  const lowStock = products.filter((product) => product.stock < 5);
  document.getElementById("lowStock").textContent = lowStock.length;
}

function displaySales() {
  const tbody = document.querySelector("#salesTable tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  const sales = StorageManager.getSales();
  console.log(sales);
  sales.forEach((sale) => {
    tbody.innerHTML += `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>KSh ${sale.total}</td>
                <td>${sale.date} ${sale.time || ""}</td>
            </tr>
        `;
  });
}

function displayProducts() {
  const tbody = document.querySelector("#productTable tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();

  const products = StorageManager.getProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search),
  );

  filteredProducts.forEach((product) => {
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

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function filterSales() {
  const selectedDate = document.getElementById("reportDate").value;

  const tbody = document.querySelector("#salesTable tbody");

  tbody.innerHTML = "";

  const sales = StorageManager.getSales();

  const filteredSales = sales.filter((sale) => sale.date === selectedDate);

  filteredSales.forEach((sale) => {
    tbody.innerHTML += `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>KSh ${sale.total}</td>
                <td>${sale.date} ${sale.time}</td>
            </tr>
        `;
  });
}
