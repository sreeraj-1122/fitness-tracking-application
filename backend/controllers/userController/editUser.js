const User = require("../../models/userModels");
const fs = require('fs');

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        let newPath;
        if (req.file) {
            const { originalname, path } = req.file
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1]
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath)
        }
        const { name, email, number, weight, height, goal } = req.body
        const updateUser =await User.findByIdAndUpdate(id,
            {
                name,
                email,
                number,
                weight,
                height,
                goals:goal,
                profile: newPath
            }

        )
        if (!updateUser) {
            res.json('User does not exist').status(400)   
        } else {
            return res.json(updateUser).status(200)
        }


    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}
module.exports = editUser