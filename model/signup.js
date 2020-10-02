const mongoose =require('mongoose');
const signupSchema=mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String,
    confpass:String
});
module.exports=mongoose.model('signup',signupSchema);
