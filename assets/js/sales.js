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

function recordSale(productId, quantity) {
  
  alert("recordSale is running")
  
    const products = StorageManager.getProducts();
    const sales = StorageManager.getSales();

    const product = products.find(p => p.id == productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    quantity = Number(quantity);

    if (quantity <= 0) {
        alert("Enter a valid quantity.");
        return;
    }

  console.log("Stock:", product.stock);
console.log("Quantity:", quantity);

alert("Stock: " + product.stock + "\nQuantity: " + quantity);

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
        date: new Date().toLocaleString()
    };

    sales.push(sale);

    StorageManager.saveProducts(products);
    StorageManager.saveSales(sales);

  showToast("Sale recorded successfully!");

}