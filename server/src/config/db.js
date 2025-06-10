import { createPool } from "mysql2/promise";

class Database {
  constructor() {
    this.pool = null;
    this.init();
  }

  init() {
    try {
      this.pool = createPool({
        host: process.env.MYSQL_LOCAL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_LOCAL_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true,
      });

      console.log("✅ Database pool created successfully");
    } catch (error) {
      console.error("❌ Error creating database pool:", error);
      throw error;
    }
  }

  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error("❌ Database query error:", error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const result = await this.query("SELECT NOW() as current_time");
      console.log("✅ Database connection test successful");
      return result;
    } catch (error) {
      console.error("❌ Database connection test failed:", error);
      throw error;
    }
  }

  async close() {
    try {
      if (this.pool) {
        await this.pool.end();
        console.log("✅ Database pool closed successfully");
      }
    } catch (error) {
      console.error("❌ Error closing database pool:", error);
      throw error;
    }
  }
}

// Singleton pattern para asegurar una sola instancia
let dbInstance = null;

export const getDatabase = () => {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
};

export default getDatabase;
