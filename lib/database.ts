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
}

export default db;