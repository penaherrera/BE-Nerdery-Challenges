"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var average_discount_util_1 = require("./utils/average-discount.util");
function analyzeProductPrices(products) {
    return __awaiter(this, void 0, void 0, function () {
        var prices, totalPrice, averagePrice, maxPrice, minPrice, expensiveProduct, cheapestProduct, onSaleProducts, averageDiscount, summary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prices = products.map(function (product) { return product.price; });
                    totalPrice = prices.reduce(function (sum, price) { return sum + price; }, 0);
                    averagePrice = parseFloat((totalPrice / prices.length).toFixed(2));
                    maxPrice = Math.max.apply(Math, prices);
                    minPrice = Math.min.apply(Math, prices);
                    expensiveProduct = products.find(function (product) { return product.price === maxPrice; });
                    cheapestProduct = products.find(function (product) { return product.price === minPrice; });
                    onSaleProducts = products.filter(function (product) { return product.onSale == true; });
                    return [4 /*yield*/, (0, average_discount_util_1.calculateAverageDiscount)(onSaleProducts)];
                case 1:
                    averageDiscount = _a.sent();
                    summary = {
                        totalCost: totalPrice,
                        averagePrice: averagePrice,
                        onSaleCount: onSaleProducts.length,
                        averageDiscount: averageDiscount,
                        mostExpensiveProduct: expensiveProduct,
                        cheapestProduct: cheapestProduct,
                    };
                    return [2 /*return*/, summary];
            }
        });
    });
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
function buildProductCatalog(products, brands) {
    return __awaiter(this, void 0, void 0, function () {
        var activeProducts, activeBrands, productsWithValidBrands, enrichedCatalog;
        return __generator(this, function (_a) {
            activeProducts = products.filter(function (product) { return product.isActive; });
            activeBrands = brands.filter(function (brand) { return brand.isActive; });
            productsWithValidBrands = activeProducts.filter(function (product) {
                return activeBrands.some(function (brand) { return brand.id === product.brandId; });
            });
            enrichedCatalog = productsWithValidBrands.map(function (product) {
                var brand = activeBrands.find(function (brand) { return brand.id === product.brandId; });
                var brandInfo = {
                    name: brand.name,
                    description: brand.description,
                    logo: brand.logo,
                    foundedYear: brand.foundedYear,
                    website: brand.website,
                    headquarters: brand.headquarters,
                    signature: brand.signature,
                    socialMedia: brand.socialMedia,
                };
                return __assign(__assign({}, product), { brandInfo: brandInfo });
            });
            return [2 /*return*/, enrichedCatalog];
        });
    });
}
//Execute ***buildProductCatalog*** function by uncomment this block
// Promise.all([
//   readJsonFile<Product>(productJsonPath),
//   readJsonFile<Brand>(brandJsonPath),
// ])
//   .then(([products, brands]) => {
//     const result = buildProductCatalog(products, brands);
//     return result;
//   })
//   .then((result) => {
//     console.dir(result, { depth: null, colors: true });
//   });
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
function filterProductsWithOneImage(products) {
    return __awaiter(this, void 0, void 0, function () {
        var productsWithImages, productsWithOneImage;
        return __generator(this, function (_a) {
            productsWithImages = products.filter(function (product) { return product.images && product.images.length > 0; });
            productsWithOneImage = productsWithImages.map(function (product) {
                return __assign(__assign({}, product), { images: [product.images[0]] });
            });
            return [2 /*return*/, productsWithOneImage];
        });
    });
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
