export const adminRoleMiddleware = (req, res, next) => {    
    if (!req.user || req.user.userType  !== 'Admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};
