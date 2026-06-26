import * as SQLite from "expo-sqlite";

//it creates and conntect to the database duuhhh
const db = SQLite.openDatabaseSync("omnistock.db")

//create the required tables for our app
export const initDatabase = () => {

    //store all the products in the inventory
    db.runSync(`
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

  //stores invoice info
  db.runSync(`
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

  //stores product info inside each bill
  db.runSync(`
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

// Sentinel: Clear database to prevent data remanence when app is reset
export const clearDatabase = () => {
  db.runSync(`DELETE FROM products`);
  db.runSync(`DELETE FROM bills`);
  db.runSync(`DELETE FROM bill_items`);
}

export default db;