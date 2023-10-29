const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentModel = new schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("comment",commentModel);