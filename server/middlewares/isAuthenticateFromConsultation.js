import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

export const isAuthenticateFromConsultation = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated!" });
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Check role authorization
    if (user.role !== "consultation" && user.role !== "admin" && user.role !== "manager") {
      return res.status(403).json({ success: false, message: "You do not have the right For medicine" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token!" });
  }
};




