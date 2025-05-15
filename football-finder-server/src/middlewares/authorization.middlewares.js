const secretKey = 'programacion-footbal-finder'
import jwt from 'jsonwebtoken'



export const verifyToken = (req, res, next) => {
    const header = req.get('Authorization') || ''
    const token = header.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try {
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (error) {
        console.log(error)
    }
}

const roleOrder = {
    superadmin: 3,
    admin: 2,
    player: 1
}
export const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) 
            return res.status(403).json({ message: 'Unauthorized: no user data' });
        
        const userRoleLevel = roleOrder[req.user.role];
        const requiredRoleLevel = roleOrder[role];

         if (!userRoleLevel || !requiredRoleLevel)
            return res.status(403).json({ message: 'Unauthorized: unknown role' });
    
         console.log(userRoleLevel, requiredRoleLevel)
         if (userRoleLevel < requiredRoleLevel) {
            return res.status(403).json({ message: 'Unauthorized: insufficient privileges' });
        }
        next();
    }
}

