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