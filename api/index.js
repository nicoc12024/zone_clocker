import express from "express";
import authRoutes from "./routes/auth.js";
import zoneRoutes from "./routes/zone.js";
import employeesRoutes from "./routes/employees.js";
import shiftRoute from "./routes/shift.js";
import accountRoute from "./routes/account.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db.js";

const app = express();
dotenv.config();

const startApp = async () => {
  try {
    // Initialize the database connection
    await initializeDatabase();

    // Middleware
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(cookieParser());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/zone", zoneRoutes);
    app.use("/api/employee", employeesRoutes);
    app.use("/api/shift", shiftRoute);
    app.use("/api/account", accountRoute);

    // Start the Express app
    app.listen(8800, () => console.log("Example app listening on port 8800!"));
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
};

// Call the async function to start the application
startApp();
