import { getDb } from "../../db.js";
import { generateToken } from "./utils/token.js";
import { findAdminByEmail } from "./utils/dbQueries.js";

// Log in an admin
export const login = async (req, res) => {
  try {
    // Search for admin with the provided email
    const adminData = await findAdminByEmail(req.body.email);

    if (adminData.length === 0) return res.status(404).json({ error: "User not found" });

    // Generate an authentication token
    const token = generateToken(adminData[0].id_admin);
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

// Log out an admin
// export const logout = async (req, res) => {
//   // Clear the authentication token cookie
//   res
//     .clearCookie("accessToken", {
//       secure: true,
//       sameSite: "none",
//       httpOnly: true,
//     })
//     .status(200)
//     .json("Logged out");
// };

// Validate an existing authentication token used in the frontend and send the user info
export const validateJWTAndSendUserInfo = (req, res) => {
  return res.status(200).json(req.userInfo);
};
