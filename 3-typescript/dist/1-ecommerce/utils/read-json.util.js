"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentJsonPath = exports.brandJsonPath = exports.productJsonPath = void 0;
exports.readJsonFile = readJsonFile;
const promises_1 = require("fs/promises");
exports.productJsonPath = "./data/products.json";
exports.brandJsonPath = "./data/brands.json";
exports.departmentJsonPath = "./data/departments.json";
async function readJsonFile(filePath) {
    const data = await (0, promises_1.readFile)(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
}
