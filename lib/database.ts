import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("omnistock.db")

export const initDatabase = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT,
      category TEXT,
      purchasePrice REAL,
      sellingPrice REAL,
      gstRate INTEGER,
      stock INTEGER,
      lowStockThreshold INTEGER,
      createdAt TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoiceNumber TEXT,
      paymentMethod TEXT,
      subtotal REAL,
      gstTotal REAL,
      grandTotal REAL,
      createdAt TEXT,
      customerName TEXT,
      customerPhone TEXT,
      customerAddress TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS bill_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      billId INTEGER,
      productId INTEGER,
      productName TEXT,
      price REAL,
      quantity INTEGER,
      gstRate REAL,
      lineTotal REAL
    );
  `);
}

export default db;