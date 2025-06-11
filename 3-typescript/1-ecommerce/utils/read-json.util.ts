import { readFile } from "fs/promises";

/**
 * Reads and parses a JSON file, returning its contents as a generic type.
 *
 * @param filePath - The path to the JSON file.
 * @returns The parsed contents of the file as type T.
 */

//JSON PATHS
export const productJsonPath = "./data/products.json";
export const brandJsonPath = "./data/brands.json";
export const departmentJsonPath = "./data/departments.json";

export async function readJsonFile<T>(filePath: string): Promise<T[]> {
  const data = await readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data) as T[];
}
