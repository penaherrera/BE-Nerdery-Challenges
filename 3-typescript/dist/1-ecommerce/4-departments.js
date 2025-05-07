"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_json_util_1 = require("./utils/read-json.util");
async function getDepartmentsWithProductCount(departments, products) {
    const productCountMap = new Map();
    const productsByDeptMap = new Map();
    products.forEach((product) => {
        const currentCount = productCountMap.get(String(product.departmentId)) || 0;
        productCountMap.set(String(product.departmentId), currentCount + 1);
        if (!productsByDeptMap.has(String(product.departmentId))) {
            productsByDeptMap.set(String(product.departmentId), []);
        }
        productsByDeptMap.get(String(product.departmentId))?.push(product);
    });
    const result = [];
    departments.forEach((department) => {
        result.push({
            name: department.name,
            productsCount: productCountMap.get(String(department.id)) || 0,
            products: productsByDeptMap.get(String(department.id)) || [],
        });
    });
    return result;
}
Promise.all([
    (0, read_json_util_1.readJsonFile)(read_json_util_1.productJsonPath),
    (0, read_json_util_1.readJsonFile)(read_json_util_1.departmentJsonPath),
])
    .then(([products, brands]) => {
    const result = getDepartmentsWithProductCount(brands, products);
    return result;
})
    .then((result) => {
    console.dir(result, { depth: null, colors: true });
});
