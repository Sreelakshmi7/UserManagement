export const managerAuthMiddleWare = (req, res, next) => {
    if (req.user && req.user.userType === 'Manager') {
        return next(); 
    }
    return res.status(403).json({ message: 'Forbidden: You are not a manager' });
};
