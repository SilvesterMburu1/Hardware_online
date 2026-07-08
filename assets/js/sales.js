function loadProductsIntoSelect() {
  const select = document.getElementById("saleProduct");

  const products = StorageManager.getProducts();

  select.innerHTML = `
        <option value="">Select Product</option>
    `;

  products.forEach((product) => {
    select.innerHTML += `
            <option value="${product.id}">
                ${product.name}
            </option>
        `;
  });
}

function recordSale(productId, quantity, paymentMethod) {
  const products = StorageManager.getProducts();
  const sales = StorageManager.getSales();

  const product = products.find((p) => p.id == productId);

  if (!product) {
    alert("Product not found.");
    return;
  }

  quantity = Number(quantity);

  if (quantity <= 0) {
    alert("Enter a valid quantity.");
    return;
  }

  if (product.stock < quantity) {
    alert("Insufficient stock.");
    return;
  }

  product.stock -= quantity;

  const sale = {
    id: Date.now(),
    productId: product.id,
    productName: product.name,
    quantity: quantity,
    total: product.price * quantity,
    profit: (product.price - product.cost) * quantity,
    paymentMethod: paymentMethod,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString(),
  };

  sales.push(sale);

  StorageManager.saveProducts(products);
  StorageManager.saveSales(sales);

  showToast("Sale recorded successfully!");
}
