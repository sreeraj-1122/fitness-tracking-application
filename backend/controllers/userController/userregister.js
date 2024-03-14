const fs = require('fs')
const bcrypt = require('bcrypt');
const User = require('../../models/userModels');
const registerUser = async (req, res) => {
    try {
        let newPath;
        if (req.file) {
            const { originalname, path } = req.file
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1]
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath )
           } 
        const { name, email, password,number} = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) { 
            if (!name || !email || !password || !number  ) { 
                return res.send('fill required fields').status(400)
            }  
            else if (password.length < 6 || password.length >= 12) {
              return res.json("password must between 6 and 12").status(400)
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
 
                const userData = await User.create({
                    name,
                    email,  
                    password: hashedPassword,
                    number, 
                    profile:newPath,
                })
                res.json(userData).status(201)
            }  
        } else {
            res.send("Email already exist").status(400)
        }
    } catch (error) {
        console.log(error,'register');
        res.status(500).send(error)
    }
}
module.exports = registerUser  