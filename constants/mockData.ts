export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stockCount: number;
    minStockLevel: number;
    supllier: string;
    warehous: string;
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

