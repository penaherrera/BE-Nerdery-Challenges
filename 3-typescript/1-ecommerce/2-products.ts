/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/

import {
  Brand,
  BrandInfo,
  EnrichedProduct,
  Product,
  Summary,
  Image,
} from "./1-types";
import { calculateAverageDiscount } from "./utils/average-discount.util";
import {
  brandJsonPath,
  productJsonPath,
  readJsonFile,
} from "./utils/read-json.util";

async function analyzeProductPrices(products: Product[]): Promise<Summary> {
  let totalPrice = 0;
  let maxPrice = products[0].price;
  let minPrice = products[0].price;
  const onSaleProducts: Product[] = [];
  const productsMap = new Map<number, Product>();

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

  const expensiveProduct = productsMap.get(maxPrice)!;
  const cheapestProduct = productsMap.get(minPrice)!;
  const averageDiscount = await calculateAverageDiscount(onSaleProducts);

  const averagePrice: number = parseFloat(
    (totalPrice / products.length).toFixed(2),
  );

  return {
    totalCost: totalPrice,
    averagePrice: averagePrice,
    onSaleCount: onSaleProducts.length,
    averageDiscount: averageDiscount,
    mostExpensiveProduct: expensiveProduct,
    cheapestProduct: cheapestProduct,
  };
}

//Execute ***analyzeProductPrices*** function by uncomment this block

// readJsonFile<Product>(productJsonPath)
//   .then((products) => {
//     const result = analyzeProductPrices(products);
//     return result;
//   })
//   .then((result) => {
//     console.dir(result, { depth: null, colors: true });
//   });

/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).
 */

async function buildProductCatalog(
  products: Product[],
  brands: Brand[],
): Promise<EnrichedProduct[]> {
  const activeBrandsMap = new Map<string, Brand>();

  brands.forEach((brand) => {
    if (brand.isActive) {
      activeBrandsMap.set(String(brand.id), brand);
    }
  });

  const enrichedCatalog: EnrichedProduct[] = [];

  products.forEach((product) => {
    if (!product.isActive) return;

    const brand = activeBrandsMap.get(String(product.brandId));

    if (!brand) return;

    const brandInfo: BrandInfo = {
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
//Execute ***buildProductCatalog*** function by uncomment this block

Promise.all([
  readJsonFile<Product>(productJsonPath),
  readJsonFile<Brand>(brandJsonPath),
])
  .then(([products, brands]) => {
    const result = buildProductCatalog(products, brands);
    return result;
  })
  .then((result) => {
    console.dir(result, { depth: null, colors: true });
  });

/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */

async function filterProductsWithOneImage(
  products: Product[],
): Promise<Product[]> {
  const productsWithImages = products.filter(
    (product) => product.images && product.images.length > 0,
  );

  const productsWithOneImage = productsWithImages.map((product) => {
    return {
      ...product,
      images: [product.images[0]],
    };
  });

  return productsWithOneImage;
}

//Execute ***filterProductsWithOneImage*** function by uncomment this block

// readJsonFile<Product>(productJsonPath)
//   .then((products) => {
//     const result = filterProductsWithOneImage(products);
//     return result;
//   })
//   .then((result) => {
//     console.dir(result, { depth: null, colors: true });
//   });
