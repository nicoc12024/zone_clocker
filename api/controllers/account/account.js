import { getDb } from "../../db.js";
import { generateHashedPassword } from "../auth/utils/password.js";

// Add account
export const addAccount = async (req, res) => {
  const { name, email, password } = req.body;
  let connection;

  // Validate the name length
  if (name.length > 25) {
    return res.status(400).json({ error: "Name exceeds 25 characters" });
  }

  try {
    connection = await getDb();
    const adminInfo = req.userInfo;

    // This info is from the admin that is logged in that comes from the token from ValidateJWT middleware
    const { id_company } = adminInfo;

    // Generate a hashed password for the new admin
    const hashedPassword = await generateHashedPassword(password);

    await connection.query(
      "INSERT INTO admin ( name, email, password, id_company) VALUES ( ?, ?, ?, ?)",
      [name, email, hashedPassword, id_company]
    );

    return res.status(201).json({ message: "Admin successfully created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get accounts
export const getAccounts = async (req, res) => {
  let connection;

  try {
    connection = await getDb();
    const adminInfo = req.userInfo;

    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    const [data] = await connection.query("SELECT * FROM admin WHERE id_company = ?", [
      id_company,
    ]);

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Update admin
export const updateAdmin = async (req, res) => {
  let connection;
  const { id_admin } = req.params;
  let { name, password } = req.body;

  try {
    connection = await getDb();

    let query = `UPDATE admin SET name = ?`;
    let queryParams = [name];

    if (password) {
      const hashedPassword = await generateHashedPassword(password);
      password = hashedPassword;
      query += `, password = ?`;
      queryParams.push(password);
    }

    query += ` WHERE id_admin = ?`;
    queryParams.push(id_admin);

    await connection.query(query, queryParams);
    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
