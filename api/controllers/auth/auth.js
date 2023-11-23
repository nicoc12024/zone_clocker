import { getDb } from "../../db.js";
import { verifyPassword, generateHashedPassword } from "./utils/password.js";
import { generateToken } from "./utils/token.js";
import {
  findAdminByEmailLogin,
  findEmployeeByIdNumber,
  createCompany,
  createAdminLinkedToCompany,
  findAdminByEmailCreateAdmin,
} from "./utils/dbQueries.js";

// Register an admin and a company
export const registerAdminAndCompany = async (req, res) => {
  let connection;
  try {
    connection = await getDb();
    await connection.beginTransaction();

    const { company_email, company_name, name, email, password } = req.body;

    // Create a new company
    const id_company = await createCompany(connection, company_email, company_name);

    // Check if admin email already exists
    const existingAdmins = await findAdminByEmailCreateAdmin(connection, email);

    if (existingAdmins.length > 0) {
      await connection.rollback();
      return res.status(409).json({ error: "Conflict: Email already exists" });
    }

    // Generate a hashed password for the new admin
    const hashedPassword = await generateHashedPassword(password);

    // Create a new admin linked to the company
    await createAdminLinkedToCompany(connection, name, email, hashedPassword, id_company);

    await connection.commit();
    res.status(201).json({ message: "Admin and Company created successfully" });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Log in an admin
export const login = async (req, res) => {
  try {
    // Search for admin with the provided email
    const adminData = await findAdminByEmailLogin(req.body.email);

    if (adminData.length === 0) return res.status(404).json({ error: "User not found" });

    // Validate the provided password
    const isValidPassword = verifyPassword(req.body.password, adminData[0].password);
    if (!isValidPassword) return res.status(400).json("Wrong password or email");

    // Generate an authentication token
    const token = generateToken(adminData[0].id_admin, "admin");
    const { password, ...userInfo } = adminData[0];

    // Add the token inside a cookie
    res
      .cookie("accessToken", token, { httpOnly: true, secure: true, sameSite: "none" })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Log in an employee
export const loginEmployee = async (req, res) => {
  try {
    const id_number = req.body.id_number.trim();
    const employeeData = await findEmployeeByIdNumber(id_number);

    if (!employeeData || employeeData.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Generate an authentication token
    const token = generateToken(employeeData[0].id_employee, "employee");

    const employeeInfo = employeeData[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(employeeInfo);
  } catch (error) {
    console.error("Error logging in employee:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Log out an admin
export const logout = async (req, res) => {
  // Clear the authentication token cookie
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    })
    .status(200)
    .json("Logged out");
};

// Validate an existing authentication token used in the frontend and send the user info
export const validateJWTAndSendUserInfo = (req, res) => {
  return res.status(200).json(req.userInfo);
};
