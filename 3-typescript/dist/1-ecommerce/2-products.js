"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const average_discount_util_1 = require("./utils/average-discount.util");
const read_json_util_1 = require("./utils/read-json.util");
async function analyzeProductPrices(products) {
    let totalPrice = 0;
    let maxPrice = products[0].price;
    let minPrice = products[0].price;
    const onSaleProducts = [];
    const productsMap = new Map();
    products.forEach((product) => {
        totalPrice += product.price;
        if (product.price > maxPrice) {
            maxPrice = product.price;
        }
        if (product.price < minPrice) {
            minPrice = product.price;
        }
        if (product.onSale === true) {
            onSaleProducts.push(product);
        }
        productsMap.set(product.price, product);
    });
    const expensiveProduct = productsMap.get(maxPrice);
    const cheapestProduct = productsMap.get(minPrice);
    const averageDiscount = await (0, average_discount_util_1.calculateAverageDiscount)(onSaleProducts);
    const averagePrice = parseFloat((totalPrice / products.length).toFixed(2));
    return {
        totalCost: totalPrice,
        averagePrice: averagePrice,
        onSaleCount: onSaleProducts.length,
        averageDiscount: averageDiscount,
        mostExpensiveProduct: expensiveProduct,
        cheapestProduct: cheapestProduct,
    };
}
async function buildProductCatalog(products, brands) {
    const activeBrandsMap = new Map();
    brands.forEach((brand) => {
        if (brand.isActive) {
            activeBrandsMap.set(String(brand.id), brand);
        }
    });
    const enrichedCatalog = [];
    products.forEach((product) => {
        if (!product.isActive)
            return;
        const brand = activeBrandsMap.get(String(product.brandId));
        if (!brand)
            return;
        const brandInfo = {
            name: brand.name,
            description: brand.description,
            logo: brand.logo,
            foundedYear: brand.foundedYear,
            website: brand.website,
            headquarters: brand.headquarters,
            signature: brand.signature,
            socialMedia: brand.socialMedia,
        };
        enrichedCatalog.push({
            ...product,
            brandInfo,
        });
    });
    return enrichedCatalog;
}
Promise.all([
    (0, read_json_util_1.readJsonFile)(read_json_util_1.productJsonPath),
    (0, read_json_util_1.readJsonFile)(read_json_util_1.brandJsonPath),
])
    .then(([products, brands]) => {
    const result = buildProductCatalog(products, brands);
    return result;
})
    .then((result) => {
    console.dir(result, { depth: null, colors: true });
});
async function filterProductsWithOneImage(products) {
    const productsWithImages = products.filter((product) => product.images && product.images.length > 0);
    const productsWithOneImage = productsWithImages.map((product) => {
        return {
            ...product,
            images: [product.images[0]],
        };
    });
    return productsWithOneImage;
}
