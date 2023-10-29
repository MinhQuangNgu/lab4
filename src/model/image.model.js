const mongoose = require('mongoose');
const schema = mongoose.Schema;

const imageModel = new schema({
    url:{
        type:String
    },
    caption:{
        type:String
    },
    path:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model("image",imageModel);