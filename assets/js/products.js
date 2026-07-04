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