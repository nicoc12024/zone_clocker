import jwt from "jsonwebtoken";

export const generateToken = (userId, userType) => {
  const payload = {
    id: userId,
    userType: userType,
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
};
