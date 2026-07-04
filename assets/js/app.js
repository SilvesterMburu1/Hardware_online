document.addEventListener("DOMContentLoaded", () => {

    const products = StorageManager.getProducts();
    const sales = StorageManager.getSales();

    document.getElementById("productCount").textContent = products.length;

    document.getElementById("salesCount").textContent = sales.length;

});