/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property.
 * - Each product should have a brandId property that corresponds to the id of a brand.
 * - The function should return an array of objects, each containing a country and the amount of products available in that country.
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country.
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */

import { Product, Brand } from "./1-types";
import {
  brandJsonPath,
  productJsonPath,
  readJsonFile,
} from "./utils/read-json.util";

async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<Record<string, number>> {
  const brandCountriesMap = new Map();

  brands.forEach((brand) => {
    const splittedHeadquarters = brand.headquarters.split(",");

    const countryName =
      splittedHeadquarters[splittedHeadquarters.length - 1].trim();

    brandCountriesMap.set(Number(brand.id), countryName);
  });

  const result = products.reduce(
    (counter, product) => {
      const country = brandCountriesMap.get(product.brandId);
      if (country) {
        counter[country] = (counter[country] || 0) + 1;
      }
      return counter;
    },
    {} as Record<string, number>,
  );

  return result;
}

Promise.all([
  readJsonFile<Product>(productJsonPath),
  readJsonFile<Brand>(brandJsonPath),
])
  .then(([products, brands]) => {
    const result = getCountriesWithBrandsAndProductCount(brands, products);
    return result;
  })
  .then((result) => {
    console.dir(result, { depth: null, colors: true });
  });
