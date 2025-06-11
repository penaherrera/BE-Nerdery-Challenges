/**
 *  Challenge 5: Get Departments with Product Count
 *
 * Create a function that takes an array of departments and products, and returns a new array of departments with the amount of products available in each department.
 *
 * Requirements:
 * - The function should accept an array of Department objects and an array of Product objects.
 * - Each department should include the quantity of products available in that department.
 * - The department should be idetified just by its name and id other properties should be excluded.
 * - In the information of the department, include the amount of products available in that department and just the name and id of the department.
 * - Add the name of the products in an array called productsNames inside the department object.
 */

//[{"name": "department-1", productsCount: 3, products: [...allProducts]}

import { Product, Department, DepartmentProducts } from "./1-types";
import {
  departmentJsonPath,
  productJsonPath,
  readJsonFile,
} from "./utils/read-json.util";

async function getDepartmentsWithProductCount(
  departments: Department[],
  products: Product[],
): Promise<DepartmentProducts[]> {
  const productCountMap = new Map<string, number>();
  const productsByDeptMap = new Map<string, Product[]>();

  products.forEach((product) => {
    const currentCount = productCountMap.get(String(product.departmentId)) || 0;
    productCountMap.set(String(product.departmentId), currentCount + 1);

    if (!productsByDeptMap.has(String(product.departmentId))) {
      productsByDeptMap.set(String(product.departmentId), []);
    }
    productsByDeptMap.get(String(product.departmentId))?.push(product);
  });

  const result: DepartmentProducts[] = [];
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
  readJsonFile<Product>(productJsonPath),
  readJsonFile<Department>(departmentJsonPath),
])
  .then(([products, brands]) => {
    const result = getDepartmentsWithProductCount(brands, products);
    return result;
  })
  .then((result) => {
    console.dir(result, { depth: null, colors: true });
  });
