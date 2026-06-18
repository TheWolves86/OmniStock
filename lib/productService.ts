import db from "./database"

export const saveProduct = (product: {
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    sellingPrice: number;
    gstRate: number;
    stock: number;
    lowStockThreshold: number;
    createdAt: string;
}) => {
    db.runSync(
        `
        INSERT INTO products (
            name,
            sku,
            category,
            purchasePrice,
            sellingPrice,
            gstRate,
            stock,
            lowStockThreshold,
            createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            product.name,
            product.sku,
            product.category,
            product.purchasePrice,
            product.sellingPrice,
            product.gstRate,
            product.stock,
            product.lowStockThreshold,
            product.createdAt
        ]
    );
};

export const getProducts = () => {
  return db.getAllSync(
    `SELECT * FROM products`
  );
};