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

export const getCategories = () => {
    return db.getAllSync(`
        SELECT DISTINCT category
        FROM products
        WHERE category IS NOT NULL
        AND category != ''
        `);
};

export const getProductById = (id: number) => {
    return db.getFirstSync(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    );
};

export const updateProduct = (
  id: number,
  product: {
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    sellingPrice: number;
    gstRate: number;
    stock: number;
    lowStockThreshold: number;
  }
) => {
  db.runSync(
    `
    UPDATE products
    SET
      name = ?,
      sku = ?,
      category = ?,
      purchasePrice = ?,
      sellingPrice = ?,
      gstRate = ?,
      stock = ?,
      lowStockThreshold = ?
    WHERE id = ?
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
      id,
    ]
  );
};

export const deleteProduct = (id: number) => {
  db.runSync(
    `DELETE FROM products WHERE id = ?`,
    [id]
  );
};

export const reduceProductStock= (
  productId: number,
  quantitySold: number
) => {
  db.runSync(
    `
    UPDATE products
    SET stock = stock - ?
    WHERE id = ?
    `,
    [quantitySold, productId]
  );
};

