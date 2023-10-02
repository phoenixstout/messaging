const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.get = (req, res) => {
    res.send('hi')
}

exports.postSignup = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if(user) return res.json({error: 'Username already taken'})
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(err) {
            console.log('bcrypt error')
            return res.sendStatus(500)
        }
        const newUser = User({
            username: req.body.username,
            password: hashedPassword
        })
        await newUser.save()
        return res.json()
    })
}

exports.postLogin = async (req, res) => {
    // Gets here only if passes passport middleware
    const token = jwt.sign({user: req.body.username}, process.env.JWTSECRET, {
        expiresIn: '2h'
    } )
    res.json({token, user:req.body.username})
}