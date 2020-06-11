var express=require("express");
var router=express.Router({mergeParams:true});
var campground=require("../models/campground");
var Comment=require("../models/comments");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{camp:camp});
        }
    })
});
router.post("/",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,campg){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,campp){
                if(err){
                    console.log(err);
                }else{
                    campp.author.id=req.user._id;
                    campp.author.username=req.user.username;
                    campp.save();
                    campg.comments.push(campp);
                    campg.save();
                    res.redirect("/campgrounds/"+campg._id);

                }
            })
        }
    })
});
router.get("/:comment_id/edit",middleware.check1,function(req,res){
    Comment.findById(req.params.comment_id,function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit",{camp_id:req.params.id,comment:camp});
        }
    })
})
router.put("/:comment_id",middleware.check1,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,campg){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
router.delete("/:comment_id",middleware.check1,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err,cam){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports=router;