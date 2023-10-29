const User = require('../model/user.model');
class userController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            const oldUser = await User.findOne({email});
            if(oldUser){
                return res.status(200).json({
                    msg:"Login successfully!",
                    user:oldUser
                })
            }
            else{
                const user = new User({
                    email,
                    username,
                    password
                })
    
                await user.save();
                return res.status(200).json({
                    msg:"Register successfully!",
                    user
                })
            }
        }
        catch (err) {
            return res.status(500).json({
                msg:err
            })
        }
    }
}

module.exports = new userController();