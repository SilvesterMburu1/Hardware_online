// Storage Manager

const StorageManager = {

    getProducts() {
        return JSON.parse(localStorage.getItem("products")) || [];
    },

    saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    },

    getSales() {
        return JSON.parse(localStorage.getItem("sales")) || [];
    },

    saveSales(sales) {
        localStorage.setItem("sales", JSON.stringify(sales));
    }

};