function addProduct(name, price, stock) {

    const products = StorageManager.getProducts();

    const product = {
        id: Date.now(),
        name,
        price: Number(price),
        stock: Number(stock)
    };

    products.push(product);

    StorageManager.saveProducts(products);

}

function deleteProduct(id) {

    let products = StorageManager.getProducts();

    products = products.filter(product => product.id !== id);

    StorageManager.saveProducts(products);

    displayProducts();

    updateDashboard();

}

function editProduct(id){

    const products = StorageManager.getProducts();

    const product = products.find(p => p.id === id);

    const newName = prompt("Product Name:", product.name);

    const newPrice = prompt("Price:", product.price);

    const newStock = prompt("Stock:", product.stock);

    if(newName === null) return;

    product.name = newName;

    product.price = Number(newPrice);

    product.stock = Number(newStock);

    StorageManager.saveProducts(products);

    displayProducts();

    updateDashboard();

}