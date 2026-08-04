import jwt from "jsonwebtoken";
const adminAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ success: false, message: "No token" });
    }
    const token = authHeader.split(" ")[1];

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (verifyToken.role !== "admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export default adminAuthentication;
