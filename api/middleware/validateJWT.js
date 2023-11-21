import jwt from "jsonwebtoken";
import { getDb } from "../db.js";

export const validateJWT = async (req, res, next) => {
  let connection;
  try {
    connection = await getDb();
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json("You need to login");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let query = "";
    if (decoded.userType === "admin") {
      query = "SELECT * FROM admin WHERE id_admin = ?";
    } else if (decoded.userType === "employee") {
      query = "SELECT * FROM employee WHERE id_employee = ?";
    } else {
      return res.status(401).json("Invalid token");
    }

    const [data] = await connection.query(query, [decoded.id]);

    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    let userInfo = data[0];
    if (decoded.userType === "admin") {
      // Exclude the password field for admins
      const { password, ...adminInfo } = userInfo;
      userInfo = adminInfo;
    }

    userInfo.userType = decoded.userType;

    req.userInfo = userInfo;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
