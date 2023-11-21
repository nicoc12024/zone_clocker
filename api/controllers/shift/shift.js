import { getDb } from "../../db.js";

// Add shift
export const addShift = async (req, res) => {
  let connection;
  const { start_time, end_time, date, id_employee } = req.body;

  try {
    connection = await getDb();

    await connection.query(
      "INSERT INTO shift ( start_time, end_time, date, id_employee) VALUES (?, ?, ?, ?)",
      [start_time, end_time, date, id_employee]
    );

    return res.status(201).json({ message: "Shift successfully created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//Get shifts
export const getShifts = async (req, res) => {
  let connection;
  try {
    connection = await getDb();
    const adminInfo = req.userInfo;

    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    // Get shifts from a company
    const [data] = await connection.query(
      `SELECT shift.* FROM shift
       JOIN employee ON shift.id_employee = employee.id_employee
       WHERE employee.id_company = ?`,
      [id_company]
    );

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

// Update shift
export const updateShift = async (req, res) => {
  let connection;

  try {
    connection = await getDb();
    const id_shift = req.params.id_shift;
    const employeeInfo = req.userInfo;
    console.log(employeeInfo);

    // Extract zone details from the request body
    const { start_time, end_time, check_in, check_out, check_in_date, check_out_date } =
      req.body;

    // Reset and check_out on employee role
    if (check_out && check_out_date && check_in) {
      await connection.query(
        `UPDATE shift
      SET check_out = ?, check_out_date = ?
      WHERE id_shift = ?`,
        [null, null, id_shift]
      );
    }

    // Reset check_in and check_out on employee role
    if (!check_in && !check_out) {
      await connection.query(
        `UPDATE shift
     SET check_in = ?, check_out = ?, check_in_date = ?, check_out_date = ?
     WHERE id_shift = ?`,
        [check_in, check_out, null, null, id_shift]
      );
    }

    // Sets check_in on employee role
    if (check_in && check_in_date) {
      await connection.query(
        `UPDATE shift
     SET check_in = ? , check_in_date = ?
     WHERE id_shift = ?`,
        [check_in, check_in_date, id_shift]
      );
    }

    // Sets check_out on employee role
    if (check_out && check_out_date && !check_in) {
      await connection.query(
        `UPDATE shift
     SET check_out = ?, check_out_date = ?
     WHERE id_shift = ?`,
        [check_out, check_out_date, id_shift]
      );
    }

    // Sets start_time and end_time on admin role
    if ((start_time, end_time)) {
      await connection.query(
        `UPDATE shift
   SET start_time = ?, end_time = ?
   WHERE id_shift = ?`,
        [start_time, end_time, id_shift]
      );
    }

    return res.status(200).json({ message: "Shift updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// // Delete shift
export const deleteShift = async (req, res) => {
  let connection;
  try {
    connection = await getDb();

    // Extract id_zone from the request body
    const id_shift = req.params.id_shift;

    // Delete the zone data
    await connection.query(`DELETE FROM shift WHERE id_shift = ?`, [id_shift]);

    return res.status(200).json({ message: "Shift deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
