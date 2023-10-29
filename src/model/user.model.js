const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = new schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model("user",userModel);