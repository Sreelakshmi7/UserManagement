export const adminAuthMiddleware = (req, res, next) => {    
    if (!req.user || req.user.userType !== 'Admin') {
        console.log("Access denied: Admins only");
        return res.status(401).json({ message: 'Access denied: Admins only' }); 
    }
    next();
};
