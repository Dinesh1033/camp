var campground=require("../models/campground");
var Comment=require("../models/comments")

var middlewareObj={};
middlewareObj.check=function(req,res,next){
        if(req.isAuthenticated()){
            campground.findById(req.params.id,function(err,camp){
                if(err){
                    res.redirect("back");
                }else{
                    if(camp.author.id.equals(req.user._id)){
                        next();
                    }else{
                        res.redirect("back")
                    }
                }
            })
        }else{
            res.redirect("back");
        }
    }

middlewareObj.check1=function check1(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,camp){
                if(err){
                    res.redirect("back");
                }else{
                    if(camp.author.id.equals(req.user._id)){
                        next();
                    }else{
                        res.redirect("back")
                    }
                }
            })
        }else{
            res.redirect("back");
        }
    }
middlewareObj.isLoggedIn=function(req,res,next){
        if(req.isAuthenticated()){
            return next();               
        }
        res.redirect("/login")
    }

module.exports=middlewareObj;