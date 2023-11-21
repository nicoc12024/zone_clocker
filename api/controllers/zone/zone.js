import { getDb } from "../../db.js";

// Add zone
export const addZone = async (req, res) => {
  let connection;
  const { name, latitude, longitude, radius } = req.body;

  // Validate the name length
  if (name.length > 25) {
    return res.status(400).json({ error: "Name exceeds 25 characters" });
  }

  try {
    connection = await getDb();
    const adminInfo = req.userInfo;

    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    await connection.query(
      "INSERT INTO zone ( name, latitude, longitude, radius, id_company) VALUES (?, ?, ?, ?, ?)",
      [name, latitude, longitude, radius, id_company]
    );

    return res.status(201).json({ message: "Zone successfully created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get zones
export const getZones = async (req, res) => {
  let connection;
  try {
    connection = await getDb();
    const adminInfo = req.userInfo;

    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    const [data] = await connection.query("SELECT * FROM zone WHERE id_company = ?", [
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

// Update zone
export const updateZone = async (req, res) => {
  let connection;
  try {
    connection = await getDb();
    const adminInfo = req.userInfo;
    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    // Extract zone details from the request body
    const { name, radius, latitude, longitude, id_zone } = req.body;

    // Update the zone data
    await connection.query(
      `UPDATE zone 
     SET name = ?, radius = ?, latitude = ?, longitude = ?, id_company = ?
     WHERE id_zone = ?`,
      [name, radius, latitude, longitude, id_company, id_zone]
    );

    return res.status(200).json({ message: "Zone updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get specific zone
export const getZoneById = async (req, res) => {
  let connection;
  try {
    connection = await getDb();
    const adminInfo = req.userInfo;
    // This info is from the admin that is logged in that comes from the token
    const { id_company } = adminInfo;

    const zone_id = req.params.id;

    if (zone_id === null || zone_id === undefined) {
      return res.status(200).json({ message: "Continue with no zone_id was provided" });
    }

    const [data] = await connection.query(
      "SELECT * FROM zone WHERE id_company = ? AND id_zone = ?",
      [id_company, zone_id]
    );

    if (data.length === 0) {
      return res.status(404).json({ message: "Zone not found" });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Delete zone
export const deleteZone = async (req, res) => {
  let connection;
  try {
    connection = await getDb();

    // Extract id_zone from the request body
    const id_zone = req.params.id;

    // Delete the zone data
    await connection.query(`DELETE FROM zone WHERE id_zone = ?`, [id_zone]);

    return res.status(200).json({ message: "Zone deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
