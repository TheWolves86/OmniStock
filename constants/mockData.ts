export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stockCount: number;
    minStockLevel: number;
    supplier: string;
    warehouseLocation: string;
    image: any;
    status: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
}

export interface supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    category: string;
    address: string;
}

export interface inventoryTransaction {
    id: string;
    productId: string;
    productName: string;
    type: 'STOCK_IN' | 'STOCK_OUT' | 'RETURN' | 'DAMAGED';
    quantity: number;
    performedBy: string;
    date: string;
}

export const mockProducts: Product[] = [
    {
    id: "PROD-001",
    name: "Logitech MX Master 3S Wireless Mouse",
    sku: "LOGI-MX3S-BLK",
    category: "Electronics",
    price: 9499,
    stockCount: 42,
    minStockLevel: 10,
    supplier: "Logitech India Tech Pvt Ltd",
    warehouseLocation: "Aisle A - Shelf 3",
    status: "IN_STOCK",
    image: "www.google.com"
    },
    {
    id: "PROD-002",
    name: "Sony keyboard with rgb",
    sku: "Sony RGB",
    category: "Electronics",
    price: 2499,
    stockCount: 45,
    minStockLevel: 10,
    supplier: "Sony India Tech Pvt Ltd",
    warehouseLocation: "Aisle B - Shelf 5",
    status: "IN_STOCK",
    image: "www.gooogle.com"
    },
    {
    id: "PROD-003",
    name: "Ps5",
    sku: "PlayStations",
    category: "Gaming",
    price: 599,
    stockCount: 20,
    minStockLevel: 5,
    supplier: "Sony",
    warehouseLocation: "Aisle B - Shelf 3",
    status: "LOW_STOCK",
    image: "www.google.com"
    },
    {
    id: "PROD-004",
    name: "Xbox 360",
    sku: "Xbox Consoles",
    category: "Gaming",
    price: 399,
    stockCount: 72,
    minStockLevel: 10,
    supplier: "Microsoft",
    warehouseLocation: "Aisle A - Shelf 7",
    status: "IN_STOCK",
    image: "www.google.com"
    },
    {
    id: "PROD-005",
    name: "Iphone 17 base",
    sku: "Iphone",
    category: "Mobiles",
    price: 1099,
    stockCount: 27,
    minStockLevel: 5,
    supplier: "Ramesh Kaka",
    warehouseLocation: "Aisle D - Shelf 1",
    status: "IN_STOCK",
    image: "www.google.com"
    },
    {
    id: "PROD-006",
    name: "Samsung Note 22",
    sku: "Samsung Note",
    category: "Mobiles",
    price: 799,
    stockCount: 12,
    minStockLevel: 3,
    supplier: "Chandu kaka",
    warehouseLocation: "Aisle D - Shelf 2",
    status: "LOW_STOCK",
    image: "www.google.com"
    },
    {
    id: "PROD-007",
    name: "Samsung external ssd",
    sku: "Samsung ssd",
    category: "Electronics",
    price: 229,
    stockCount: 45,
    minStockLevel: 9,
    supplier: "Samsung",
    warehouseLocation: "Aisle D - Shelf 3",
    status: "LOW_STOCK",
    image: "www.google.com"
    }
]
