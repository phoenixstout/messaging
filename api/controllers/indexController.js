const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

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
        return res.json({content: "hi"})
    })

}