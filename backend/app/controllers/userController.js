const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {}

userController.register = (req, res) => {
    const body = req.body
    console.log('📥 Incoming register request body:', req.body);
    const user = new User(body)
    bcrypt.genSalt()
       .then((salt)=>{
        console.log(salt)
          bcrypt.hash(user.password, salt)
            .then((encryptedPassword) => {
                user.password = encryptedPassword
                user.save()
                   .then((user) => {
                    console.log(user)
                      res.json(user)
                   })
                   .catch((err) =>{
                     res.json(err)
                   })
            })
       })
       .catch((err) => {
            console.error('Registration error:', err);
            res.status(500).json({ error: err.message || err });
       });
}

userController.login = (req, res) => {
    const body = req.body
    console.log('📥 Login req.body:', req.body); 
    User.findOne({email : body.email})
       .then((user) => {
          if(user){
            bcrypt.compare(body.password, user.password) 
                .then((match) => {
                    if(match){
                        const tokenData = {
                            _id : user._id,
                            username: user.username,
                            email: user.email,
                            role: user.role
                        }
                        const token = jwt.sign (tokenData, 'poorinmabn@123',  {expiresIn : '60d' })
                        console.log(token)
                        res.json({token: `Bearer ${token}`,
                            user: {
                                _id: user._id,
                                username: user.username,
                                email: user.email,
                                role: user.role
                            }
                        })
                    } else {
                        res.json({errors: 'invalid email or password'})
                    }
                }) 
          } else {
                 res.json({errors: 'invalid email or password'})
          }    
       })
       .catch((err) =>{
            res.json(err)
       })
    
}

userController.account = (req, res) =>{
    res.json(req.user)
}

module.exports = userController