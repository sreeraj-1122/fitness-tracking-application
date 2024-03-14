const User = require("../../models/userModels");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await User.findByIdAndDelete(id)
        if (userData) {
            res.status(200).json('user deleted successfully');

        }else{
            res.status(400).json('User not found')
        }
    } catch (error) {
        res.json(error).status(500)
        console.log(error);
    }
}
module.exports=deleteUser;