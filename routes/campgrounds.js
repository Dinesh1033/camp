var express=require("express");
var router=express.Router();
var campground=require("../models/campground");
var middleware=require("../middleware")


router.get("/", function(req,res){
    campground.find({},function(err, alcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:alcampgrounds})
        }
    })
})
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})
router.post("/",middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image= req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var camp={name:name,price:price,image:image,description:description,author:author}
    campground.create(camp, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds")

        }
    
    })
});
router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{camp:camp})
        }
    })

});
//edit
router.get("/:id/edit",middleware.check,function(req,res){
       campground.findById(req.params.id,function(err,camp){
           if(err){
               console.log(err);
           }else{
                res.render("campgrounds/edit",{camp:camp})   
           }
                
       })
    });
router.put("/:id",middleware.check,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,a){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})
router.delete("/:id",middleware.check,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err,a){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
})


module.exports=router;