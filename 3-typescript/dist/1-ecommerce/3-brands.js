"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_json_util_1 = require("./utils/read-json.util");
async function getCountriesWithBrandsAndProductCount(brands, products) {
    const brandCountriesMap = new Map();
    brands.forEach((brand) => {
        const splittedHeadquarters = brand.headquarters.split(",");
        const countryName = splittedHeadquarters[splittedHeadquarters.length - 1].trim();
        brandCountriesMap.set(Number(brand.id), countryName);
    });
    const result = products.reduce((counter, product) => {
        const country = brandCountriesMap.get(product.brandId);
        if (country) {
            counter[country] = (counter[country] || 0) + 1;
        }
        return counter;
    }, {});
    return result;
}
Promise.all([
    (0, read_json_util_1.readJsonFile)(read_json_util_1.productJsonPath),
    (0, read_json_util_1.readJsonFile)(read_json_util_1.brandJsonPath),
])
    .then(([products, brands]) => {
    const result = getCountriesWithBrandsAndProductCount(brands, products);
    return result;
})
    .then((result) => {
    console.dir(result, { depth: null, colors: true });
});
