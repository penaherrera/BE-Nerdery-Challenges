/**
 * Challenge 1: Type Definitions for Product Catalog
 *
 * You need to define proper TypeScript types for the product catalog data.
 * These types should accurately represent the structure of the JSON data and establish
 * the relationships between different entities (e.g., products and brands).
 *
 * The JSON data is provided in the `data` folder.
 *
 * Consider:
 * - Handle all of the properties in the JSON data as accurately as possible in typescript types
 * - Use appropriate types for each property (e.g., string, number, boolean, etc.)
 * - Optional properties and mandatory properties
 * - The use of union types for properties that can have multiple types
 * - The use of enums for properties that can have a limited set of values
 * - The use of interfaces and type aliases to create a clear and maintainable structure
 */

//Base Type and Global Types

export type BaseEntity = {
  id: number | string;
  name: string;
  departmentId: number;
  description: string;
  isActive: boolean;
  keywords: string;
};


export type Image = {
  id: number;
  url: string;
  alt: string;
  isMain: boolean;
};

// PRODUCTS JSON

//! Add necessary type definitions for the products json file
export type Specifications = {
  [key: string]: string;
};

export type Size = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;



export type Product = BaseEntity & {
  categoryId: number;
  brandId: number;
  linkId: string;
  refId: string;
  isVisible: boolean;
  descriptionShort: string;
  releaseDate: string;
  title: string;
  taxCode: string;
  metaTagDescription: string;
  supplierId: number;
  showWithoutStock: boolean;
  adWordsRemarketingCode?: string;
  lomadeeCampaignCode?: string;
  score: number;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  colors: string[];
  sizes: Size[];
  tags: string[];
  images: Image[];
  specifications: Specifications;
};

// CATEGORIES JSON
//! Add necessary type definitions for the categories json file

export type Filters = {
  name: string;
  values: string[];
};

export type Category = BaseEntity & {
  iconUrl: string;
  bannerUrl: string;
  displayOrder: number;
  metaDescription: string;
  filters: Filters[];
};

// BRANDS JSON
//! Add necessary type definitions for the brands json file


export type SocialMedia = {
  instagram: string;
  twitter: string;
  facebook: string;
};

export type Brand = Pick<BaseEntity, "id" | "name" | "description" | "isActive"> & {
  logo: string;
  foundedYear: number;
  website: string;
  headquarters: `${string}, ${string}`;
  signature: string;
  socialMedia: SocialMedia;
};

// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file

export type Department = Pick<
  Category,
  "id" | "name" | "description" | "isActive" | 
  "displayOrder" | "bannerUrl" | "iconUrl" | "metaDescription"
> & {
  featuredCategories: number[];
  slug: string;
};

// Types and Interfaces used in excercises 2, 3 and 4
export interface Summary {
  totalCost: number;
  averagePrice: number;
  mostExpensiveProduct: Product;
  cheapestProduct: Product;
  onSaleCount: number;
  averageDiscount: number;
}

export type BrandInfo = Omit<Brand, "id" | "isActive">;

export type EnrichedProduct = Product & {
  brandInfo: BrandInfo;
};

export type BrandWithCountry = Brand & {
  country: string;
};

export type DepartmentProducts = Pick<Department, "name"> & {
  productsCount: number;
  products: Product[];
};

export interface Technology {
  language?: string;
  framework: string | null;
}

export interface Carlos extends Pick<BaseEntity, "name"> {
  age: number;
  isBackendDev: boolean;
  techStack: Technology[];
}
