const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../../models/userModels")

const loginFunction = async (req, res) => {
    try {
        const { email, password } = req.body 
        const userExist = await User.findOne({ email }) 
        if (userExist) {
            if (userExist.email === email && await bcrypt.compare(password, userExist.password)) {
                
                res.status(200).send({
                    msg:"logged success ",
                    Token: generateToken(userExist._id),
                    userExist
                })
               

            } else {
                res.send("login failed ")
 
            }
        } else {
            res.json("User dose not exist")
        }

    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}
module.exports=loginFunction 