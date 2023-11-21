import { getDb } from "../../../db.js";

// 1 When creating a new company we create an admin linked to that company
export const createCompany = async (connection, companyEmail, companyName) => {
  try {
    const [result] = await connection.query(
      "INSERT INTO company (email, name) VALUES (?, ?)",
      [companyEmail, companyName]
    );
    return result.insertId;
  } catch (err) {
    console.error("Error while creating new company:", err);
    throw err;
  }
};

// 2
export const createAdminLinkedToCompany = async (
  connection,
  name,
  email,
  hashedPassword,
  id_company
) => {
  try {
    await connection.query(
      "INSERT INTO admin (name, email, password, id_company) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, id_company]
    );
  } catch (err) {
    console.error("Error while creating new admin:", err);
    throw err;
  }
};

export const findAdminByEmail = async (email) => {
  const connection = await getDb();
  try {
    const [data] = await connection.query("SELECT * FROM admin WHERE email = ?", [email]);
    return data;
  } catch (err) {
    console.error("Error while finding admin by email:", err);
    throw err;
  } finally {
    connection.release();
  }
};

export const findEmployeeByIdNumber = async (id_number_to_string) => {
  const connection = await getDb();

  try {
    const [data] = await connection.query("SELECT * FROM employee WHERE id_number = ?", [
      id_number_to_string,
    ]);
    return data;
  } catch (err) {
    console.error("Error while finding employee by id number:", err);
    throw err;
  } finally {
    connection.release();
  }
};
