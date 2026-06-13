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
]
