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

export type Base = {
  id: number | string;
  name: string;
  departmentId: number;
  description: Capitalize<string>;
  isActive: boolean;
  keywords: string;
};

export type ImageDirectory = "products" | "categories" | "departments";

export type ImageExtension = "jpg" | "png";

export type ImagePath = `${ImageDirectory}/${string}.${ImageExtension}`;

export type UpperCaseString = Uppercase<string>;

export type UncapitalizedString = Uncapitalize<string>;

export type CapitalizedString = Capitalize<string>;

export type Image = {
  id: number;
  url: ImagePath;
  alt: `${string} - ${string}`;
  isMain: boolean;
};

// PRODUCTS JSON

//! Add necessary type definitions for the products json file
export type Specifications = {
  [key: string]: string;
};

export type Size = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type ISODateTime =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}`;

export type Product = Base & {
  categoryId: number;
  brandId: number;
  linkId: UncapitalizedString;
  refId: UncapitalizedString;
  isVisible: boolean;
  descriptionShort: CapitalizedString;
  releaseDate: ISODateTime;
  title: string;
  taxCode: UpperCaseString;
  metaTagDescription: CapitalizedString;
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
  name: CapitalizedString;
  values: CapitalizedString[];
};

export type Category = Base & {
  iconUrl: ImagePath;
  bannerUrl: ImagePath;
  displayOrder: number;
  metaDescription: CapitalizedString;
  filters: Filters[];
};

// BRANDS JSON
//! Add necessary type definitions for the brands json file

export type AtSocialMedia = `@${string}`;

export type SocialMedia = {
  instagram: AtSocialMedia;
  twitter: AtSocialMedia;
  facebook: CapitalizedString;
};

export type Brand = Pick<Base, "id" | "name" | "description" | "isActive"> & {
  logo: `${string}.${ImageExtension}`;
  foundedYear: number;
  website: string;
  headquarters: `${CapitalizedString}, ${CapitalizedString}`;
  signature: string;
  socialMedia: SocialMedia;
};

// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file

export type Department = Pick<
  Base,
  "id" | "name" | "description" | "isActive"
> &
  Pick<
    Category,
    "displayOrder" | "bannerUrl" | "iconUrl" | "metaDescription"
  > & {
    featuredCategories: number[];
    slug: UncapitalizedString;
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
  country: CapitalizedString;
};

export type DepartmentProducts = Pick<Department, "name"> & {
  productsCount: number;
  products: Product[];
};

export interface Technology {
  language?: CapitalizedString;
  framework: CapitalizedString | null;
}

export interface Carlos extends Pick<Base, "name"> {
  age: number;
  isBackendDev: boolean;
  techStack: Technology[];
}
