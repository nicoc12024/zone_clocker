import bcrypt from "bcryptjs";

export const generateHashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error while hashing password:", err);
    throw err;
  }
};

export const verifyPassword = (plainText, hashedPassword) => {
  return bcrypt.compareSync(plainText, hashedPassword);
};
