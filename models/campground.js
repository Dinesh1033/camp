var mongoose    = require("mongoose");
var comment     = require("./comments");
var user=require("./user");

var campSchema=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:user
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:comment
        }
    ]
})

var campground=mongoose.model("campground", campSchema);
module.exports=campground;
