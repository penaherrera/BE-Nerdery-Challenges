"use strict";
/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */
Object.defineProperty(exports, "__esModule", { value: true });
function deepClone(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return deepClone(item); });
    }
    var clonedObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
}
var numberTwo = 2;
var carlos = {
    name: "Carlos",
    age: 24,
    isBackendDev: true,
    techStack: [
        {
            language: "Ruby",
            framework: "Ruby On Rails",
        },
        {
            language: "NodeJS",
            framework: "Nest",
        },
        {
            language: undefined,
            framework: null,
        },
    ],
};
var twoProducts = [
    {
        id: 1101,
        name: "Horizon Trail Rush Desert Tan",
        departmentId: 3001,
        categoryId: 4004,
        brandId: 445566,
        linkId: "horizon-trail-rush-desert-tan",
        refId: "htr_desert_1101",
        isVisible: true,
        description: "Designed for serious trail runners, the Horizon Trail Rush features aggressive lugs for maximum traction on varied terrain. The breathable upper keeps feet cool while protective overlays shield against rocks and debris.",
        descriptionShort: "Maximum trail traction with desert-inspired colorway.",
        releaseDate: "2024-04-05T00:00:00",
        keywords: "Horizon,Trail,Rush,Desert,Tan,Outdoor",
        title: "Horizon Trail Rush Desert Tan",
        isActive: true,
        taxCode: "TRAIL888",
        metaTagDescription: "Conquer any trail with superior grip and all-day comfort.",
        supplierId: 5,
        showWithoutStock: false,
        adWordsRemarketingCode: "",
        lomadeeCampaignCode: "",
        score: 4.7,
        price: 139.95,
        salePrice: 119.95,
        onSale: true,
        colors: ["Desert Tan", "Forest Green", "Slate Blue"],
        sizes: [7, 8, 9, 10, 11, 12],
        tags: ["Trail", "Performance", "New Arrival"],
        images: [
            {
                id: 10111,
                url: "products/horizon-trail-rush-desert-tan-main.jpg",
                alt: "Horizon Trail Rush Desert Tan - Main View",
                isMain: true,
            },
            {
                id: 10112,
                url: "products/horizon-trail-rush-desert-tan-side.jpg",
                alt: "Horizon Trail Rush Desert Tan - Side View",
                isMain: false,
            },
        ],
        specifications: {
            material: "Ripstop nylon mesh with TPU overlays, rubber outsole",
            weight: "315g (size 9)",
            cushioning: "Responsive rock plate and EVA foam",
            closure: "Quick-pull lacing system",
            archSupport: "Medium to High",
        },
    },
    {
        id: 1102,
        name: "Velocity Pro Court Victory White",
        departmentId: 3001,
        categoryId: 4006,
        brandId: 98765,
        linkId: "velocity-pro-court-victory-white",
        refId: "vpcv_white_1102",
        isVisible: true,
        description: "Dominate the tennis court with the Velocity Pro Court Victory. Engineered for quick lateral movements and stability during intense matches, with a durable outsole specifically designed for court surfaces.",
        descriptionShort: "Tennis performance with classic white styling.",
        releaseDate: "2024-03-10T00:00:00",
        keywords: "Velocity,Pro,Court,Tennis,White",
        title: "Velocity Pro Court Victory White",
        isActive: true,
        taxCode: "COURT222",
        metaTagDescription: "Professional-grade tennis shoes with superior lateral support.",
        supplierId: 7,
        showWithoutStock: true,
        adWordsRemarketingCode: "",
        lomadeeCampaignCode: "",
        score: 4.6,
        price: 129.99,
        salePrice: null,
        onSale: false,
        colors: ["White", "Navy", "Green"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        tags: ["Tennis", "Court", "Premium"],
        images: [
            {
                id: 10121,
                url: "products/velocity-pro-court-victory-white-main.jpg",
                alt: "Velocity Pro Court Victory White - Main View",
                isMain: true,
            },
        ],
        specifications: {
            material: "Synthetic leather upper with herringbone rubber outsole",
            weight: "340g (size 10)",
            cushioning: "GEL heel system with responsive forefoot",
            closure: "Traditional lace-up",
            archSupport: "Medium",
        },
    },
];
var result = deepClone(twoProducts);
console.log(result);
