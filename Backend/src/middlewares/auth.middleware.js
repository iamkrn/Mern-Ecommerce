const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token;

        // 1. Cookies se token
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // 2. Headers se token (Bearer)
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // ❌ Agar token nahi mila
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login required. No token provided."
            });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Request me user attach
        req.user = decoded;       // { id: ... }
        req.userId = decoded.id;  // direct use ke liye

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;