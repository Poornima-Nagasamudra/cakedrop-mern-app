const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateUser = (req, res, next) => {
    try{ 
        const authHeader = req.headers['authorization']
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ error: 'Missing or malformed token' })
        }

        const token = authHeader.split(' ')[1]
        const tokenData = jwt.verify(token, 'poorinmabn@123')

        User.findById(tokenData._id)
        
        .then((user) => {
            console.log('User Role:', user.role)
            req.user = user
            next()
        })
        .catch((err) => {
            console.error('Error fetching user:', err);
            res.json(err)
        }) 
    } catch(e){
        console.error('JWT error:', e);
        res.status(400).json(e)
    }
}

const authorizeUser = (req, res, next) => {
    if(['admin','user', 'customer'].includes(req.user.role)){
        console.log('Authorize check for role:', req.user.role)

        next()
    } else {
        console.log("❌ Access denied due to role:", req.user?.role)
        res.status(403).json({errors: "Access denied"})
    }
}

module.exports = {authenticateUser, authorizeUser}