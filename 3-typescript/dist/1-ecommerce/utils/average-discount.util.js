"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageDiscount = calculateAverageDiscount;
async function calculateAverageDiscount(products) {
    const discountedProducts = products.filter((product) => product.salePrice != null && product.salePrice < product.price);
    if (discountedProducts.length === 0)
        return 0;
    const totalDiscount = discountedProducts.reduce((sum, product) => {
        const discount = ((product.price - product.salePrice) / product.price) * 100;
        return sum + discount;
    }, 0);
    const averageDiscount = totalDiscount / discountedProducts.length;
    return parseFloat(averageDiscount.toFixed(2));
}
