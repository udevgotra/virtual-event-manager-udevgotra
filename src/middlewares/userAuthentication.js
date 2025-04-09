const jwt = require('jsonwebtoken')
JWT_SECRET = process.env.JWT_SECRET


const authenticateToken = async (req, res, next) => {
    try {
        console.log("[Middleware] authenticateToken: ")
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });


        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });


        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.error('[Middleware] authenticateToken: Token verification error:', err);
                return res.status(401).json({ message: 'Invalid or expired token.' });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        console.error('[Middleware] authenticateToken: JWT Middleware Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const authorizeUser = async (req, res, next) => {
    try {
        console.log("[Middleware] authorizeUser: ")
        if (!req.role == "admin") {
            console.error('[Middleware] authorizeUser: Unauthorized access attempt');
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    } catch (err) {
        console.error('[Middleware] authorizeUser: JWT Middleware Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    authenticateToken, authorizeUser
}
