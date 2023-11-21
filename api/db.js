import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

export const initializeDatabase = async () => {
  try {
    pool = mysql2.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 15,
      queueLimit: 0,
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

export const getDb = async () => {
  if (!pool) {
    throw new Error("Database connection not initialized.");
  }
  const connection = await pool.getConnection();
  return connection;
};
