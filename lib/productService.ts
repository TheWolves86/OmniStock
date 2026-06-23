import db from "./database"

//save a new product to the inventory
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

//it gets products for different screen to use as data
export const getProducts = () => {
  return db.getAllSync(
    `SELECT * FROM products`
  );
};

//it gets the categories from the products
export const getCategories = () => {
    return db.getAllSync(`
        SELECT DISTINCT category
        FROM products
        WHERE category IS NOT NULL
        AND category != ''
        `);
};

//gets the product id using the database id lol
export const getProductById = (id: number) => {
    return db.getFirstSync(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    );
};

//updates the product info
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

//removes a product from the inventory
export const deleteProduct = (id: number) => {
  db.runSync(
    `DELETE FROM products WHERE id = ?`,
    [id]
  );
};

//it reduces the product stock after billing
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
