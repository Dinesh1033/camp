var express= require("express");
var bodyParser= require("body-parser");
var mongodb=require("mongodb");
var mongoose= require("mongoose");
var passport=require("passport");
var flash=require("connect-flash");
var passportLocal=require("passport-local");
var method=require("method-override");
var User=require("./models/user");
var campground=require("./models/campground");
var Comment=require("./models/comments");
var comro=require("./routes/comments");
var campRou=require("./routes/campgrounds");
var authro=require("./routes/index")

var app= express();
mongoose.connect("mongodb+srv://Dinesh_10:Dineshcse@10@cluster0-xq65t.mongodb.net/ground?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static(__dirname +"/public"))

app.use(method("_method"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());
app.set("view engine", "ejs");
//
app.use(require("express-session")({
    secret:"dinesh",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})
app.get("/", function(req,res){
    res.render("landing");
});
app.use("/campgrounds/:id/comments",comro);
app.use("/campgrounds",campRou);
app.use("/",authro);
app.listen(3000,function(){
    console.log("server");
});